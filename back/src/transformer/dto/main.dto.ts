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

  @ApiProperty({ example: "СРЭС", description: "РЭС", required: false })
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

  @ApiProperty({ example: "", description: "ГЕО получено", required: false })
  @IsOptional()
  @IsString()
  readonly geoReceived?: string;

  @ApiProperty({ example: "0/0/0/0", description: "Статус согл ГЕО", required: false })
  @IsOptional()
  @IsString()
  readonly geoAgreeStatus?: string;


  @ApiProperty({ example: "Комиссия ГНБ ОК", description: "ГНБ (ПИР)", required: false })
  @IsOptional()
  @IsString()
  readonly gnbPir?: string;

  @ApiProperty({ example: "06.08.2025", description: "ГНБ (ПИР) дата", required: false })
  @IsOptional()
  @IsString()
  readonly gnbPirDate?: string;

  @ApiProperty({ example: "24.01.2025", description: "СМР старт", required: false })
  @IsOptional()
  @IsString()
  readonly smrStart?: string;

  @ApiProperty({ example: "07.02.2025", description: "Конец договора", required: false })
  @IsOptional()
  @IsString()
  readonly contractEnd?: string;
}
