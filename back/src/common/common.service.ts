import { Injectable } from '@nestjs/common';
import reasons, { Reason } from 'src/transformer/reasons';

@Injectable()
export class CommonService {
  formatDate(input: string) {
    const normalized = input.replace(/[^0-9.]/g, '.');
    const [day, month, year] = normalized.split('.');
    const months = [
      'января',
      'февраля',
      'марта',
      'апреля',
      'мая',
      'июня',
      'июля',
      'августа',
      'сентября',
      'октября',
      'ноября',
      'декабря',
    ];
    return `«${day}» ${months[parseInt(month, 10) - 1]} ${year} г.`;
  }

  switchReasonsTemplate(idTempl: string): string {
    switch (idTempl) {
      case '1':
        return 'templates_train/5073.docx';
      case '2':
        return 'templates_train/4955.docx';
      case '1':
      //   return 'templates_train/5073.docx';
      // case '2':
      //   return 'templates/3824.docx';
      // case '3':
      //   return 'templates/4396.docx';
      // case '4':
      //   return 'templates/4955.docx';
      // case '5':
      //   return 'templates/5049.docx';
      // case '6':
      //   return 'templates/5073.docx';
      default:
        return 'templates/5073.docx';
    }
  }
  extractMainObject(title: string): string | null {
    if (!title) return null;

    // Ищем префиксы и напряжение, допускаем разные дефисы и дробные/многочастные напряжения (100/10/0,4)
    const regex =
      /(?:2БКТП|БКТП|КТП|ТП|ВЛИ|ВЛЗ|ВЛ|КЛ)\s*[-–—]?\s*\d+(?:\/\d+)*(?:[.,]\d+)?\s*кв/gi;

    const matches = title.match(regex);
    if (!matches || matches.length === 0) return null;

    const raw = matches[0].trim();
    let normalized = raw.replace(/[\u2013\u2014]/g, '-');
    normalized = normalized.replace(/\s*-\s*/g, '-');
    normalized = normalized.replace(/\s*кв$/i, 'кВ');
    normalized = normalized.replace(/\s+/g, ' ').trim();

    return normalized;
  }

  containReason(recivedReasons: Reason[], data: Record<string, any>) {
    const reasonsMap = new Map<number, string>(
      reasons.map((r) => [r.id, r.text]),
    );
    const texts = recivedReasons
      .map((rr) => reasonsMap.get(rr.id))
      .filter((t): t is string => typeof t === 'string');

    const result: Record<string, string | null> = {};
    for (let i = 0; i < 5; i++) {
      let text = texts[i] ?? null;
      if (text) {
        text = (text ?? '')
          .replace('{contractEnd}', this.formatDate(data.contractEnd) ?? '')
          .replace('{title_cleared}', this.extractMainObject(data.title) ?? '')
          .replace('{res}', data.res ?? '')
          .replace('{applicant}', data.applicant ?? '');
      } else {
        text = '';
      }
      result[`reason${i + 1}`] = text;
    }
    return result;
  }

  outgoingDateNumber(input: string): string {
    try {
      let date = '';
      let number = '';

      // ищем дату
      const dateMatch = input.match(/(\d{2}\.\d{2}\.\d{4})/);
      if (dateMatch) {
        date = dateMatch[1];
      }

      // ищем номер
      const numberMatch = input.match(/(?:№\s*([^\s]+)|\s([А-ЯA-Z0-9\/-]+))$/u);
      if (numberMatch) {
        number = numberMatch[1] || numberMatch[2] || '';
      }

      const formattedDate = date ? `${date} г.` : '';
      return number ? `№ ${number} от ${formattedDate}` : input;
    } catch (error) {
      console.error(error);
      return input;
    }
  }
}
