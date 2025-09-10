import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, IsNumberString } from "class-validator";

export class ExcelRowDTO {
  @ApiProperty({ example: "3824", description: "№СМР", required: false })
  @IsOptional()
  @IsNumberString()
  readonly smrNo?: string;

  @ApiProperty({ example: "Х962798-328251", description: "№Дог Зак", required: false })
  @IsOptional()
  @IsString()
  readonly contractNo?: string;

  @ApiProperty({ example: "ХРЭС", description: "РЭС", required: false })
  @IsOptional()
  @IsString()
  readonly res?: string;

  @ApiProperty({ example: "заключен", description: "Статус договора", required: false })
  @IsOptional()
  @IsString()
  readonly contractStatus?: string;

  @ApiProperty({ example: "Север", description: "Основной договор", required: false })
  @IsOptional()
  @IsString()
  readonly mainContract?: string;

  @ApiProperty({ example: "МОЭСК СЭС (рамочный)", description: "Заказчик", required: false })
  @IsOptional()
  @IsString()
  readonly customer?: string;

  @ApiProperty({ example: "Строительство ТП-100/10/0,4кВ...", description: "Титул", required: false })
  @IsOptional()
  @IsString()
  readonly title?: string;

  @ApiProperty({ example: "Логинова Марина Васильевна", description: "Заявитель ФИО", required: false })
  @IsOptional()
  @IsString()
  readonly applicant?: string;

  @ApiProperty({ example: "Солнечногорский р-н, ...", description: "Адрес", required: false })
  @IsOptional()
  @IsString()
  readonly address?: string;

  @ApiProperty({ example: "50:09:0070410:398", description: "КН участника", required: false })
  @IsOptional()
  @IsString()
  readonly cadastralNumber?: string;

  @ApiProperty({ example: "15 0,4 Третья", description: "Мощность по ТУ", required: false })
  @IsOptional()
  @IsString()
  readonly powerByTU?: string;

  @ApiProperty({ example: "03.10.2024", description: "ТУ получены (дата или текст)", required: false })
  @IsOptional()
  @IsString()
  readonly tuReceived?: string;

  @ApiProperty({ example: "1", description: "Поступил в работу", required: false })
  @IsOptional()
  @IsString()
  readonly receivedToWork?: string;

  @ApiProperty({ example: "Султанова Инна Раухатовна", description: "Менеджер проекта", required: false })
  @IsOptional()
  @IsString()
  readonly projectManager?: string;

  @ApiProperty({ example: "ПИР ждем", description: "Классификатор", required: false })
  @IsOptional()
  @IsString()
  readonly classifier?: string;

  @ApiProperty({ example: "Вайс Юлианна Александровна", description: "Обследователь", required: false })
  @IsOptional()
  @IsString()
  readonly surveyor?: string;

  @ApiProperty({ example: "060 - Подготовить план трассы...", description: "ГИП исполнитель", required: false })
  @IsOptional()
  @IsString()
  readonly gipExecutor?: string;

  @ApiProperty({ example: "(нет)", description: "Статус ПИР", required: false })
  @IsOptional()
  @IsString()
  readonly pirStatus?: string;

  @ApiProperty({ example: "04.10.2024", description: "Статус ПИР дата", required: false })
  @IsOptional()
  @IsString()
  readonly pirStatusDate?: string;

  @ApiProperty({ example: "", description: "Выезд на ППО", required: false })
  @IsOptional()
  @IsString()
  readonly ppoVisit?: string;

  @ApiProperty({ example: "", description: "ГЕО получено", required: false })
  @IsOptional()
  @IsString()
  readonly geoReceived?: string;

  @ApiProperty({ example: "0/0/0/0", description: "Статус согл ГЕО", required: false })
  @IsOptional()
  @IsString()
  readonly geoAgreeStatus?: string;

  @ApiProperty({ example: "", description: "ГЕО согласовано всеми", required: false })
  @IsOptional()
  @IsString()
  readonly geoAgreedAll?: string;

  @ApiProperty({ example: "", description: "Статус согл ПТ", required: false })
  @IsOptional()
  @IsString()
  readonly ptAgreeStatus?: string;

  @ApiProperty({ example: "", description: "ПТ согласован Землевлад.", required: false })
  @IsOptional()
  @IsString()
  readonly ptAgreedLandowner?: string;

  @ApiProperty({ example: "", description: "ПТ и обуд согл с РЭС", required: false })
  @IsOptional()
  @IsString()
  readonly ptEquipAgreeWithRes?: string;

  @ApiProperty({ example: "Комиссия ГНБ ОК", description: "ГНБ (ПИР)", required: false })
  @IsOptional()
  @IsString()
  readonly gnbPir?: string;

  @ApiProperty({ example: "06.08.2025", description: "ГНБ (ПИР) дата", required: false })
  @IsOptional()
  @IsString()
  readonly gnbPirDate?: string;

  @ApiProperty({ example: "(нет)", description: "Статус РЗА", required: false })
  @IsOptional()
  @IsString()
  readonly rzaStatus?: string;

  @ApiProperty({ example: "", description: "Статус РЗА дата", required: false })
  @IsOptional()
  @IsString()
  readonly rzaStatusDate?: string;

  @ApiProperty({ example: "(нет)", description: "Статус ТМ", required: false })
  @IsOptional()
  @IsString()
  readonly tmStatus?: string;

  @ApiProperty({ example: "", description: "Статус ТМ дата", required: false })
  @IsOptional()
  @IsString()
  readonly tmStatusDate?: string;

  @ApiProperty({ example: "(нет)", description: "ПИР Предв. согл. до АПСД", required: false })
  @IsOptional()
  @IsString()
  readonly pirPreAgreeBeforeApsd?: string;

  @ApiProperty({ example: "(нет)", description: "ПИР согласован АПСД", required: false })
  @IsOptional()
  @IsString()
  readonly pirAgreedApsd?: string;

  @ApiProperty({ example: "(нет)", description: "Отв. за СМР", required: false })
  @IsOptional()
  @IsString()
  readonly smrResponsible?: string;

  @ApiProperty({ example: "(нет)", description: "Статус СМР", required: false })
  @IsOptional()
  @IsString()
  readonly smrStatus?: string;

  @ApiProperty({ example: "", description: "Дата статуса СМР", required: false })
  @IsOptional()
  @IsString()
  readonly smrStatusDate?: string;

  @ApiProperty({ example: "(нет)", description: "Статус Снабж матер", required: false })
  @IsOptional()
  @IsString()
  readonly supplyMatStatus?: string;

  @ApiProperty({ example: "", description: "Дата статуса Снабж матер", required: false })
  @IsOptional()
  @IsString()
  readonly supplyMatDate?: string;

  @ApiProperty({ example: "(нет)", description: "Статус Снабж оборуд", required: false })
  @IsOptional()
  @IsString()
  readonly supplyEquipStatus?: string;

  @ApiProperty({ example: "", description: "Дата статуса Снабж оборуд", required: false })
  @IsOptional()
  @IsString()
  readonly supplyEquipDate?: string;

  @ApiProperty({ example: "(нет)", description: "Статус Отключение", required: false })
  @IsOptional()
  @IsString()
  readonly disconnStatus?: string;

  @ApiProperty({ example: "", description: "Дата статус Отключение", required: false })
  @IsOptional()
  @IsString()
  readonly disconnStatusDate?: string;

  @ApiProperty({ example: "", description: "Зем ордер статус", required: false })
  @IsOptional()
  @IsString()
  readonly landOrderStatus?: string;

  @ApiProperty({ example: "", description: "Дата статуса Зем ордер", required: false })
  @IsOptional()
  @IsString()
  readonly landOrderDate?: string;

  @ApiProperty({ example: "24.01.2025", description: "СМР старт", required: false })
  @IsOptional()
  @IsString()
  readonly smrStart?: string;

  @ApiProperty({ example: "", description: "СМР финиш", required: false })
  @IsOptional()
  @IsString()
  readonly smrFinish?: string;

  @ApiProperty({ example: "(нет)", description: "Статус СК ЭС", required: false })
  @IsOptional()
  @IsString()
  readonly skEsStatus?: string;

  @ApiProperty({ example: "", description: "Дата статуса СК ЭС", required: false })
  @IsOptional()
  @IsString()
  readonly skEsDate?: string;

  @ApiProperty({ example: "(нет)", description: "Отв ИД", required: false })
  @IsOptional()
  @IsString()
  readonly idResponsible?: string;

  @ApiProperty({ example: "(нет)", description: "Статус ИД", required: false })
  @IsOptional()
  @IsString()
  readonly idStatus?: string;

  @ApiProperty({ example: "", description: "Дата статуса ИД", required: false })
  @IsOptional()
  @IsString()
  readonly idStatusDate?: string;

  @ApiProperty({ example: "(нет)", description: "Паспорта получены ПТО", required: false })
  @IsOptional()
  @IsString()
  readonly ptoPassportsReceived?: string;

  @ApiProperty({ example: "(нет)", description: "Требуется исп схема", required: false })
  @IsOptional()
  @IsString()
  readonly requiresExecScheme?: string;

  @ApiProperty({ example: "(нет)", description: "ИД согласовано РЭС", required: false })
  @IsOptional()
  @IsString()
  readonly idAgreedRES?: string;

  @ApiProperty({ example: "(нет)", description: "ИД сдано в архив", required: false })
  @IsOptional()
  @IsString()
  readonly idArchived?: string;

  @ApiProperty({ example: "нет", description: "Статус ВКЛ", required: false })
  @IsOptional()
  @IsString()
  readonly onStatus?: string;

  @ApiProperty({ example: "(нет)", description: "Дата статуса ВКЛ", required: false })
  @IsOptional()
  @IsString()
  readonly onStatusDate?: string;

  @ApiProperty({ example: "(нет)", description: "Объект включен", required: false })
  @IsOptional()
  @IsString()
  readonly objectIncluded?: string;

  @ApiProperty({ example: "(нет)", description: "Отв Смета", required: false })
  @IsOptional()
  @IsString()
  readonly estimateResponsible?: string;

  @ApiProperty({ example: "(нет)", description: "Статус ПСД", required: false })
  @IsOptional()
  @IsString()
  readonly psdStatus?: string;

  @ApiProperty({ example: "", description: "Дата статуса ПСД", required: false })
  @IsOptional()
  @IsString()
  readonly psdStatusDate?: string;

  @ApiProperty({ example: "", description: "Смета согласована заказчиком", required: false })
  @IsOptional()
  @IsString()
  readonly estimateAgreedCustomer?: string;

  @ApiProperty({ example: "", description: "ПСД утверждено", required: false })
  @IsOptional()
  @IsString()
  readonly psdApproved?: string;

  @ApiProperty({ example: "", description: "Расчет", required: false })
  @IsOptional()
  @IsString()
  readonly calculation?: string;

  @ApiProperty({ example: "", description: "Конец договора", required: false })
  @IsOptional()
  @IsString()
  readonly contractEnd?: string;

  @ApiProperty({ example: "", description: "Жалобы Организация", required: false })
  @IsOptional()
  @IsString()
  readonly complaintsOrg?: string;
}
