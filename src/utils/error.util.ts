
interface PostnetError {
  code: number;
  codeStr: string;
  message: string;
}

export const parseErrors = (command: Buffer): PostnetError | null =>  {
  const commandStr = command.toString('binary').slice(1, -1); // remove STX, ETX and CRC
  const [cmd, ...params] = commandStr.split('\t'); // split command and params

  const errrors = params.map((param) => {
    if (!param.startsWith('?')) {
      return null;
    }

    const errorCode = +param.slice(1);

    const error = [
      ...frameErrors,
      ...commandErrorMessages,
    ].find((frameError) => frameError.code === errorCode);

    if (error) {
      return error;
    }
  }).filter((error) => error !== null);

  return errrors.find(() => true);
}

export const frameErrors: PostnetError[] = [{
  code: 1,
  codeStr: 'PROTO_ERR_CMD_UNKNOWN',
  message: 'PROTO_ERR_CMD_UNKNOWN: Nierozpoznana komenda',
},
{
  code: 2,
  codeStr: 'PROTO_ERR_CMD_MANDATORY_FIELDS',
  message: 'PROTO_ERR_CMD_MANDATORY_FIELDS: Brak obowiązkowego pola',
},
{
  code: 3,
  codeStr: 'PROTO_ERR_DATA_CONVERSION',
  message: 'PROTO_ERR_DATA_CONVERSION: Błąd konwersji pola (np.: przesłana została wartość z przecinkiem w polu którego wartość przesyła się w częściach setnych np.: 12,34 zamiast 1234, lub przekroczony zakres danych)',
},
{
  code: 4,
  codeStr: 'PROTO_ERR_TOKEN_INVALID',
  message: 'PROTO_ERR_TOKEN_INVALID: Błędny token',
},
{
  code: 5,
  codeStr: 'PROTO_ERR_CRC_INVALID',
  message: 'PROTO_ERR_CRC_INVALID: Zła suma kontrolna',
},
{
  code: 6,
  codeStr: 'PROTO_ERR_FLD_INVALID',
  message: 'PROTO_ERR_FLD_INVALID: Puste pole (kolejno dwa tabulatory)',
},
{
  code: 7,
  codeStr: 'PROTO_ERR_CMD_LENGTH',
  message: 'PROTO_ERR_CMD_LENGTH: Niewłaściwa długość nazwy rozkazu',
},
{
  code: 8,
  codeStr: 'PROTO_ERR_TOKEN_LENGTH',
  message: 'PROTO_ERR_TOKEN_LENGTH: Niewłaściwa długość tokena',
},
{
  code: 9,
  codeStr: 'PROTO_ERR_CRC_LENGTH',
  message: 'PROTO_ERR_CRC_LENGTH: Niewłaściwa długość sumy kontrolnej',
},
{
  code: 10,
  codeStr: 'PROTO_ERR_DATA_LENGTH',
  message: 'PROTO_ERR_DATA_LENGTH: Niewłaściwa długość pola danych',
},
{
  code: 11,
  codeStr: 'PROTO_ERR_INPUT_BUFFER_OVERRUN',
  message: 'PROTO_ERR_INPUT_BUFFER_OVERRUN: Zapełniony bufor odbiorczy',
},
{
  code: 12,
  codeStr: 'PROTO_ERR_CMD_IMMEDIATE_FORBIDDEN',
  message: 'PROTO_ERR_CMD_IMMEDIATE_FORBIDDEN: Nie można wykonać rozkazu w trybie natychmiastowym',
},
{
  code: 13,
  codeStr: 'PROTO_ERR_TOKEN_NOT_FOUND',
  message: 'PROTO_ERR_TOKEN_NOT_FOUND: Nie znaleziono rozkazu o podanym tokenie',
},
{
  code: 14,
  codeStr: 'PROTO_ERR_INPUT_QUEUE_FULL',
  message: 'PROTO_ERR_INPUT_QUEUE_FULL: Zapełniona kolejka wejściowa',
},
{
  code: 15,
  codeStr: 'PROTO_ERR_SYNTAX',
  message: 'PROTO_ERR_SYNTAX: Błąd budowy ramk',
}];

export const commandErrorMessages: PostnetError[] = [{
  code: 10,
  codeStr: 'ERR_CANCEL',
  message: 'ERR_CANCEL: Błąd nietypowy - rezygnacja, przerwanie funkcji',
},
{
  code: 50,
  codeStr: 'ERR_UNKN',
  message: 'ERR_UNKN: Błąd wykonywania operacji przez kasę',
},
{
  code: 51,
  codeStr: 'ERR_ASSERT_FM',
  message: 'ERR_ASSERT_FM: Błąd wykonywania operacji przez kasę',
},
{
  code: 52,
  codeStr: 'ERR_ASSERT_DB',
  message: 'ERR_ASSERT_DB: Błąd wykonywania operacji przez kasę',
},
{
  code: 53,
  codeStr: 'ERR_ASSERT_SALE',
  message: 'ERR_ASSERT_SALE: Błąd wykonywania operacji przez kasę',
},
{
  code: 54,
  codeStr: 'ERR_ASSERT_UI',
  message: 'ERR_ASSERT_UI: Błąd wykonywania operacji przez kasę',
},
{
  code: 55,
  codeStr: 'ERR_ASSERT_CFG',
  message: 'ERR_ASSERT_CFG: Błąd wykonywania operacji przez kasę',
},
{
  code: 323,
  codeStr: 'ERR_OPER_BLOCKED',
  message: 'ERR_OPER_BLOCKED: Funkcja zablokowana w konfiguracji',
},
{
  code: 360,
  codeStr: 'ERR_SERVICE_SWITCH_FOUND',
  message: 'ERR_SERVICE_SWITCH_FOUND: Znaleziono zworę serwisową',
},
{
  code: 361,
  codeStr: 'ERR_SERVICE_SWITCH_NOT_FOUND',
  message: 'ERR_SERVICE_SWITCH_NOT_FOUND: Nie znaleziono zwory serwisowej',
},
{
  code: 362,
  codeStr: 'ERR_SERVICE_KEY_DATA',
  message: 'ERR_SERVICE_KEY_DATA: Błąd weryfikacji danych klucza',
},
{
  code: 363,
  codeStr: 'ERR_SERVICE_KEY_TIMEOUT',
  message: 'ERR_SERVICE_KEY_TIMEOUT: Upłynął czas na odpowiedź od klucza',
},
{
  code: 382,
  codeStr: 'ERR_RD_ZERO',
  message: 'ERR_RD_ZERO: Próba wykonania raportu zerowego',
},
{
  code: 383,
  codeStr: 'ERR_RD_NOT_PRINTED',
  message: 'ERR_RD_NOT_PRINTED: Brak raportu dobowego',
},
{
  code: 384,
  codeStr: 'ERR_FM_NO_REC',
  message: 'ERR_FM_NO_REC: Brak rekordu w pamięci',
},
{
  code: 400,
  codeStr: 'ERR_WRONG_VALUE',
  message: 'ERR_WRONG_VALUE: Błędna wartość',
},
{
  code: 460,
  codeStr: 'ERR_CLOCK_RTC_FSK',
  message: 'ERR_CLOCK_RTC_FSK: Błąd zegara w trybie fiskalnym',
},
{
  code: 461,
  codeStr: 'ERR_CLOCK_RTC_NFSK',
  message: 'ERR_CLOCK_RTC_NFSK: Błąd zegara w trybie niefiskalnym',
},
{
  code: 480,
  codeStr: 'ERR_AUTH_AUTHORIZED',
  message: 'ERR_AUTH_AUTHORIZED: Drukarka już autoryzowana, bezterminowo',
},
{
  code: 481,
  codeStr: 'ERR_AUTH_NOT_STARTED',
  message: 'ERR_AUTH_NOT_STARTED: Nie rozpoczęto jeszcze autoryzacji',
},
{
  code: 482,
  codeStr: 'ERR_AUTH_WAS_ADDED',
  message: 'ERR_AUTH_WAS_ADDED: Kod już wprowadzony',
},
{
  code: 483,
  codeStr: 'ERR_AUTH_DAY_CNT',
  message: 'ERR_AUTH_DAY_CNT: Próba wprowadzenia błędnych wartości',
},
{
  code: 484,
  codeStr: 'ERR_AUTH_BLOCKED',
  message: 'ERR_AUTH_BLOCKED: Minął czas pracy kasy, sprzedaż zablokowana',
},
{
  code: 485,
  codeStr: 'ERR_AUTH_BAD_CODE',
  message: 'ERR_AUTH_BAD_CODE: Błędny kod autoryzacji',
},
{
  code: 486,
  codeStr: 'ERR_AUTH_TOO_MANY_WRONG_CODES',
  message: 'ERR_AUTH_TOO_MANY_WRONG_CODES: Blokada autoryzacji. Wprowadź kod z klawiatury',
},
{
  code: 500,
  codeStr: 'ERR_STAT_MIN_OVF',
  message: 'ERR_STAT_MIN_OVF: Przepełnienie statystyki minimalnej',
},
{
  code: 501,
  codeStr: 'ERR_STAT_MAX_OVF',
  message: 'ERR_STAT_MAX_OVF: Przepełnienie statystyki maksymalnej',
},
{
  code: 502,
  codeStr: 'ERR_CASH_IN_MAX_OVF',
  message: 'ERR_CASH_IN_MAX_OVF: Przepełnienie stanu kasy',
},
{
  code: 503,
  codeStr: 'ERR_CASH_OUT_BELOW_0',
  message: 'ERR_CASH_OUT_BELOW_0: Wartość stanu kasy po wypłacie staje się ujemna (przyjmuje się stan zerowy kasy)',
},
{
  code: 700,
  codeStr: 'ERR_INVALID_IP_ADDR',
  message: 'ERR_INVALID_IP_ADDR: Błędny adres IP',
},
{
  code: 701,
  codeStr: 'ERR_INVALID_TONE_NUMBER',
  message: 'ERR_INVALID_TONE_NUMBER: Błąd numeru tonu',
},
{
  code: 702,
  codeStr: 'ERR_ILLEGAL_DRAWER_IMPULSE_LEN',
  message: 'ERR_ILLEGAL_DRAWER_IMPULSE_LEN: Błąd długości impulsu szuflady',
},
{
  code: 703,
  codeStr: 'ERR_ILLEGAL_VAT_RATE',
  message: 'ERR_ILLEGAL_VAT_RATE: Błąd stawki VAT',
},
{
  code: 704,
  codeStr: 'ERR_INVALID_LOGOUT_TIME',
  message: 'ERR_INVALID_LOGOUT_TIME: Błąd czasu wylogowania',
},
{
  code: 705,
  codeStr: 'ERR_INVALID_SLEEP_TIME',
  message: 'ERR_INVALID_SLEEP_TIME: Błąd czasu uśpienia',
},
{
  code: 706,
  codeStr: 'ERR_INVALID_TURNOFF_TIME',
  message: 'ERR_INVALID_TURNOFF_TIME: Błąd czasu wyłączenia',
},
{
  code: 713,
  codeStr: 'ERR_CONFIG_SET',
  message: 'ERR_CONFIG_SET: Błędne parametry konfiguracji',
},
{
  code: 714,
  codeStr: 'ERR_ILLEGAL_DSP_CONTRAST',
  message: 'ERR_ILLEGAL_DSP_CONTRAST: Błędna wartość kontrastu wyświetlacza',
},
{
  code: 715,
  codeStr: 'ERR_ILLEGAL_DSP_LUMIN',
  message: 'ERR_ILLEGAL_DSP_LUMIN: Błędna wartość podświetlenia wyświetlacza',
},
{
  code: 716,
  codeStr: 'ERR_ILLEGAL_DSP_OFF_DELAY',
  message: 'ERR_ILLEGAL_DSP_OFF_DELAY: Błędna wartość czasu zaniku podświetlenia',
},
{
  code: 717,
  codeStr: 'ERR_LINE_TOO_LONG',
  message: 'ERR_LINE_TOO_LONG: Zbyt długa linia nagłówka albo stopki',
},
{
  code: 718,
  codeStr: 'ERR_ILLEGAL_COMM_CFG',
  message: 'ERR_ILLEGAL_COMM_CFG: Błędna konfiguracja komunikacji',
},
{
  code: 719,
  codeStr: 'ERR_ILLEGAL_PROTOCOL_CFG',
  message: 'ERR_ILLEGAL_PROTOCOL_CFG: Błędna konfiguracja protokołu komunikacji',
},
{
  code: 720,
  codeStr: 'ERR_ILLEGAL_PORT',
  message: 'ERR_ILLEGAL_PORT: Błędny identyfikator portu',
},
{
  code: 721,
  codeStr: 'ERR_ILLEGAL_INFO_TXT_NUM',
  message: 'ERR_ILLEGAL_INFO_TXT_NUM: Błędny numer tekstu reklamowego',
},
{
  code: 722,
  codeStr: 'ERR_ILLEGAL_TIME_DIFF',
  message: 'ERR_ILLEGAL_TIME_DIFF: Podany czas wychodzi poza wymagany zakres',
},
{
  code: 723,
  codeStr: 'ERR_ILLEGAL_TIME',
  message: 'ERR_ILLEGAL_TIME: Podana data/czas niepoprawne',
},
{
  code: 724,
  codeStr: 'ERR_ILLEGAL_HOUR_DIFF',
  message: 'ERR_ILLEGAL_HOUR_DIFF: Inna godzina w różnicach czasowych 0<=>23',
},
{
  code: 726,
  codeStr: 'ERR_ILLEGAL_DSP_LINE_CONTENT',
  message: 'ERR_ILLEGAL_DSP_LINE_CONTENT: Błędna zawartość tekstu w linii wyświetlacza',
},
{
  code: 727,
  codeStr: 'ERR_ILLEGAL_DSP_SCROLL_VALUE',
  message: 'ERR_ILLEGAL_DSP_SCROLL_VALUE: Błędna wartość dla przewijania na wyświetlaczu',
},
{
  code: 728,
  codeStr: 'ERR_ILLEGAL_PORT_CFG',
  message: 'ERR_ILLEGAL_PORT_CFG: Błędna konfiguracja portu',
},
{
  code: 738,
  codeStr: 'ERR_ETH_CONFIG',
  message: 'ERR_ETH_CONFIG: Nieprawidłowa konfiguracja Ethernetu',
},
{
  code: 739,
  codeStr: 'ERR_ILLEGAL_DSP_ID',
  message: 'ERR_ILLEGAL_DSP_ID: Nieprawidłowy typ wyświetlacza',
},
{
  code: 740,
  codeStr: 'ERR_ILLEGAL_DSP_ID_FOR_OFF_DELAY',
  message: 'ERR_ILLEGAL_DSP_ID_FOR_OFF_DELAY: Dla tego typu wyświetlacza nie można ustawić czasu zaniku podświetlenia',
},
{
  code: 820,
  codeStr: 'ERR_TEST',
  message: 'ERR_TEST: Negatywny wynik testu',
},
{
  code: 821,
  codeStr: 'ERR_TEST_NO_CONF',
  message: 'ERR_TEST_NO_CONF: Brak testowanej opcji w konfiguracji',
},
{
  code: 857,
  codeStr: 'ERR_DF_DB_NO_MEM',
  message: 'ERR_DF_DB_NO_MEM: Brak pamięci na inicjalizację bazy drukarkowej',
},
{
  code: 1000,
  codeStr: 'ERR_FATAL_FM',
  message: 'ERR_FATAL_FM: Błąd fatalny modułu fiskalnego',
},
{
  code: 1001,
  codeStr: 'ERR_FM_NCONN',
  message: 'ERR_FM_NCONN: Wypięta pamięć fiskalna',
},
{
  code: 1002,
  codeStr: 'ERR_FM_WRITE',
  message: 'ERR_FM_WRITE: Błąd zapisu',
},
{
  code: 1003,
  codeStr: 'ERR_FM_UNKN',
  message: 'ERR_FM_UNKN: Błąd nie ujęty w specyfikacji bios',
},
{
  code: 1004,
  codeStr: 'ERR_FM_CHKSUM_CNT',
  message: 'ERR_FM_CHKSUM_CNT: Błędne sumy kontrolne',
},
{
  code: 1005,
  codeStr: 'ERR_FM_CTRL_BLK_0',
  message: 'ERR_FM_CTRL_BLK_0: Błąd w pierwszym bloku kontrolnym',
},
{
  code: 1006,
  codeStr: 'ERR_FM_CTRL_BLK_1',
  message: 'ERR_FM_CTRL_BLK_1: Błąd w drugim bloku kontrolnym',
},
{
  code: 1007,
  codeStr: 'ERR_FM_BAD_REC_ID',
  message: 'ERR_FM_BAD_REC_ID: Błędny id rekordu',
},
{
  code: 1008,
  codeStr: 'ERR_FM_DATA_ADDR_INIT',
  message: 'ERR_FM_DATA_ADDR_INIT: Błąd inicjalizacji adresu startowego',
},
{
  code: 1009,
  codeStr: 'ERR_FM_DATA_ADDR_INITED',
  message: 'ERR_FM_DATA_ADDR_INITED: Adres startowy zainicjalizowany',
},
{
  code: 1010,
  codeStr: 'ERR_FM_NU_PRESENT',
  message: 'ERR_FM_NU_PRESENT: Numer unikatowy już zapisany',
},
{
  code: 1011,
  codeStr: 'ERR_FM_NU_NO_PRESENT_FSK',
  message: 'ERR_FM_NU_NO_PRESENT_FSK: Brak numeru w trybie fiskalnym',
},
{
  code: 1012,
  codeStr: 'ERR_FM_NU_WRITE',
  message: 'ERR_FM_NU_WRITE: Błąd zapisu numeru unikatowego',
},
{
  code: 1013,
  codeStr: 'ERR_FM_NU_FULL',
  message: 'ERR_FM_NU_FULL: Przepełnienie numerów unikatowych',
},
{
  code: 1014,
  codeStr: 'ERR_FM_NU_LANG',
  message: 'ERR_FM_NU_LANG: Błędny język w numerze unikatowym',
},
{
  code: 1015,
  codeStr: 'ERR_FM_TIN_CNT',
  message: 'ERR_FM_TIN_CNT: Więcej niż jeden NIP',
},
{
  code: 1016,
  codeStr: 'ERR_FM_READ_ONLY_NFSK',
  message: 'ERR_FM_READ_ONLY_NFSK: Drukarka w trybie do odczytu bez rekordu fiskalizacji',
},
{
  code: 1017,
  codeStr: 'ERR_FM_CLR_RAM_CNT',
  message: 'ERR_FM_CLR_RAM_CNT: Przekroczono liczbę zerowań RAM',
},
{
  code: 1018,
  codeStr: 'ERR_FM_REP_DAY_CNT',
  message: 'ERR_FM_REP_DAY_CNT: Przekroczono liczbę raportów dobowych',
},
{
  code: 1019,
  codeStr: 'ERR_FM_VERIFY_NU',
  message: 'ERR_FM_VERIFY_NU: Błąd weryfikacji numeru unikatowego',
},
{
  code: 1020,
  codeStr: 'ERR_FM_VERIFY_STAT',
  message: 'ERR_FM_VERIFY_STAT: Błąd weryfikacji statystyk z RD.',
},
{
  code: 1021,
  codeStr: 'ERR_FM_VERIFY_NVR_READ',
  message: 'ERR_FM_VERIFY_NVR_READ: Błąd odczytu danych z NVR do weryfikacji FM',
},
{
  code: 1022,
  codeStr: 'ERR_FM_VERIFY_NVR_WRITE',
  message: 'ERR_FM_VERIFY_NVR_WRITE: Błąd zapisu danych z NVR do weryfikacji FM',
},
{
  code: 1023,
  codeStr: 'ERR_FM_CTRL_BLK_2',
  message: 'ERR_FM_CTRL_BLK_2: Pamięć fiskalna jest mała 1Mb zamiast 2Mb',
},
{
  code: 1024,
  codeStr: 'ERR_FM_DATA_ADDR_NO_INITED',
  message: 'ERR_FM_DATA_ADDR_NO_INITED: Nie zainicjalizowany obszar danych w pamięci fiskalnej',
},
{
  code: 1025,
  codeStr: 'ERR_FM_NU_FORMAT',
  message: 'ERR_FM_NU_FORMAT: Błędny format numeru unikatowego',
},
{
  code: 1026,
  codeStr: 'ERR_FM_REC_BAD_CNT',
  message: 'ERR_FM_REC_BAD_CNT: Za dużo błędnych bloków w FM',
},
{
  code: 1027,
  codeStr: 'ERR_FM_NO_BADBLK_MARKER',
  message: 'ERR_FM_NO_BADBLK_MARKER: Błąd oznaczenia błędnego bloku',
},
{
  code: 1028,
  codeStr: 'ERR_FM_REC_EMPTY',
  message: 'ERR_FM_REC_EMPTY: Rekord w pamięci fiskalnej nie istnieje - obszar pusty',
},
{
  code: 1029,
  codeStr: 'ERR_FM_REC_DATE',
  message: 'ERR_FM_REC_DATE: Rekord w pamięci fiskalnej z datą późniejszą od poprzedniego',
},
{
  code: 1950,
  codeStr: 'ERR_TR_TOT_OVR',
  message: 'ERR_TR_TOT_OVR: Przekroczony zakres totalizerów paragonu',
},
{
  code: 1951,
  codeStr: 'ERR_TR_PF_OVR',
  message: 'ERR_TR_PF_OVR: Wpłata formą płatności przekracza max. wpłatę',
},
{
  code: 1952,
  codeStr: 'ERR_TR_PF_SUM_OVR',
  message: 'ERR_TR_PF_SUM_OVR: Suma form płatności przekracza max. wpłatę',
},
{
  code: 1953,
  codeStr: 'ERR_PAYMENT_OVR',
  message: 'ERR_PAYMENT_OVR: Formy płatności pokrywają już do zapłaty',
},
{
  code: 1954,
  codeStr: 'ERR_TR_CHANGE_OVR',
  message: 'ERR_TR_CHANGE_OVR: Wpłata reszty przekracza max. wpłatę',
},
{
  code: 1955,
  codeStr: 'ERR_TR_CHANGE_SUM_OVR',
  message: 'ERR_TR_CHANGE_SUM_OVR: Suma form płatności przekracza max. wpłatę',
},
{
  code: 1956,
  codeStr: 'ERR_TR_TOTAL_OVR',
  message: 'ERR_TR_TOTAL_OVR: Przekroczony zakres totalizerów',
},
{
  code: 1957,
  codeStr: 'ERR_TR_FISC_OVR',
  message: 'ERR_TR_FISC_OVR: Przekroczony maksymalny zakres paragonu',
},
{
  code: 1958,
  codeStr: 'ERR_TR_PACK_OVR',
  message: 'ERR_TR_PACK_OVR: Przekroczony zakres wartości opakowań',
},
{
  code: 1959,
  codeStr: 'ERR_TR_PACK_STORNO_OVR',
  message: 'ERR_TR_PACK_STORNO_OVR: Przekroczony zakres wartości opakowań przy stornowaniu',
},
{
  code: 1961,
  codeStr: 'ERR_TR_PF_REST_TOO_BIG',
  message: 'ERR_TR_PF_REST_TOO_BIG: Wpłata reszty zbyt duża',
},
{
  code: 1962,
  codeStr: 'ERR_TR_PF_ZERO',
  message: 'ERR_TR_PF_ZERO: Wpłata formą płatności wartości 0',
},
{
  code: 1980,
  codeStr: 'ERR_TR_DISCNT_BASE_OVR',
  message: 'ERR_TR_DISCNT_BASE_OVR: Przekroczony zakres kwoty bazowej rabatu/narzutu',
},
{
  code: 1981,
  codeStr: 'ERR_TR_DISCNT_AFTER_OVR',
  message: 'ERR_TR_DISCNT_AFTER_OVR: Przekroczony zakres kwoty po rabacie/narzucie',
},
{
  code: 1982,
  codeStr: 'ERR_TR_DISCNT_CALC',
  message: 'ERR_TR_DISCNT_CALC: Błąd obliczania rabatu/narzutu',
},
{
  code: 1983,
  codeStr: 'ERR_TR_DISCNT_BASE_NEGATIVE_OR_ZERO',
  message: 'ERR_TR_DISCNT_BASE_NEGATIVE_OR_ZERO: Wartość bazowa ujemna lub równa 0',
},
{
  code: 1984,
  codeStr: 'ERR_TR_DISCNT_ZERO',
  message: 'ERR_TR_DISCNT_ZERO: Wartość rabatu/narzutu równa 0',
},
{
  code: 1985,
  codeStr: 'ERR_TR_DISCNT_AFTER_NEGATIVE_OR_ZERO',
  message: 'ERR_TR_DISCNT_AFTER_NEGATIVE_OR_ZERO: Wartość po rabacie ujemna lub równa 0',
},
{
  code: 1990,
  codeStr: 'ERR_TR_STORNO_NOT_ALLOWED',
  message: 'ERR_TR_STORNO_NOT_ALLOWED: Niedozwolone stornowanie towaru. Błędny stan transakcji',
},
{
  code: 1991,
  codeStr: 'ERR_TR_DISCNT_NOT_ALLOWED',
  message: 'ERR_TR_DISCNT_NOT_ALLOWED: Niedozwolony rabat/narzut. Błędny stan transakcji',
},
{
  code: 2000,
  codeStr: 'ERR_TR_FLD_VAT',
  message: 'ERR_TR_FLD_VAT: Błąd pola VAT',
},
{
  code: 2002,
  codeStr: 'ERR_NO_HDR',
  message: 'ERR_NO_HDR: Brak nagłówka',
},
{
  code: 2003,
  codeStr: 'ERR_HDR',
  message: 'ERR_HDR: Zaprogramowany nagłówek',
},
{
  code: 2004,
  codeStr: 'ERR_NO_VAT',
  message: 'ERR_NO_VAT: Brak aktywnych stawek VAT',
},
{
  code: 2005,
  codeStr: 'ERR_NO_TRNS_MODE',
  message: 'ERR_NO_TRNS_MODE: Brak trybu transakcji',
},
{
  code: 2006,
  codeStr: 'ERR_TR_FLD_PRICE',
  message: 'ERR_TR_FLD_PRICE: Błąd pola cena (cena <= 0)',
},
{
  code: 2007,
  codeStr: 'ERR_TR_FLD_QUANT',
  message: 'ERR_TR_FLD_QUANT: Błąd pola ilość (ilość <= 0)',
},
{
  code: 2008,
  codeStr: 'ERR_TR_FLD_TOTAL',
  message: 'ERR_TR_FLD_TOTAL: Błąd kwoty total',
},
{
  code: 2009,
  codeStr: 'ERR_TR_FLD_TOTAL_ZERO',
  message: 'ERR_TR_FLD_TOTAL_ZERO: Błąd kwoty total, równa zero',
},
{
  code: 2010,
  codeStr: 'ERR_TOT_OVR',
  message: 'ERR_TOT_OVR: Przekroczony zakres totalizerów dobowych',
},
{
  code: 2021,
  codeStr: 'ERR_RTC_WAS_SET',
  message: 'ERR_RTC_WAS_SET: Próba ponownego ustawienia zegara',
},
{
  code: 2022,
  codeStr: 'ERR_RTC_DIFF',
  message: 'ERR_RTC_DIFF: Zbyt duża różnica dat',
},
{
  code: 2023,
  codeStr: 'ERR_RTC_HOUR',
  message: 'ERR_RTC_HOUR: Różnica większa niż godzina w trybie użytkownika w trybie fiskalnym',
},
{
  code: 2024,
  codeStr: 'ERR_RTC_BAD_FORMAT',
  message: 'ERR_RTC_BAD_FORMAT: Zły format daty (np. 13 miesiąc)',
},
{
  code: 2025,
  codeStr: 'ERR_RTC_FM_DATE',
  message: 'ERR_RTC_FM_DATE: Data wcześniejsza od ostatniego zapisu do modułu',
},
{
  code: 2026,
  codeStr: 'ERR_RTC',
  message: 'ERR_RTC: Błąd zegara',
},
{
  code: 2027,
  codeStr: 'ERR_VAT_CHNG_CNT',
  message: 'ERR_VAT_CHNG_CNT: Przekroczono maksymalną liczbę zmian stawek VAT',
},
{
  code: 2028,
  codeStr: 'ERR_VAT_SAME',
  message: 'ERR_VAT_SAME: Próba zdefiniowania identycznych stawek VAT',
},
{
  code: 2029,
  codeStr: 'ERR_VAT_VAL',
  message: 'ERR_VAT_VAL: Błędne wartości stawek VAT',
},
{
  code: 2030,
  codeStr: 'ERR_VAT_NO_ACTIVE',
  message: 'ERR_VAT_NO_ACTIVE: Próba zdefiniowania stawek VAT wszystkich nieaktywnych',
},
{
  code: 2031,
  codeStr: 'ERR_FLD_TIN',
  message: 'ERR_FLD_TIN: Błąd pola NIP',
},
{
  code: 2032,
  codeStr: 'ERR_FM_ID',
  message: 'ERR_FM_ID: Błąd numeru unikatowego pamięci fiskalnej',
},
{
  code: 2033,
  codeStr: 'ERR_FISC_MODE',
  message: 'ERR_FISC_MODE: Urządzenie w trybie fiskalnym',
},
{
  code: 2034,
  codeStr: 'ERR_NO_FISC_MODE',
  message: 'ERR_NO_FISC_MODE: Urządzenie w trybie niefiskalnym',
},
{
  code: 2035,
  codeStr: 'ERR_TOT_NOT_ZERO',
  message: 'ERR_TOT_NOT_ZERO: Niezerowe totalizery',
},
{
  code: 2036,
  codeStr: 'ERR_READ_ONLY',
  message: 'ERR_READ_ONLY: Urządzenie w stanie tylko do odczytu',
},
{
  code: 2037,
  codeStr: 'ERR_NO_READ_ONLY',
  message: 'ERR_NO_READ_ONLY: Urządzenie nie jest w stanie tylko do odczytu',
},
{
  code: 2038,
  codeStr: 'ERR_TRNS_MODE',
  message: 'ERR_TRNS_MODE: Urządzenie w trybie transakcji',
},
{
  code: 2039,
  codeStr: 'ERR_TOT_ZERO',
  message: 'ERR_TOT_ZERO: Zerowe totalizery',
},
{
  code: 2040,
  codeStr: 'ERR_CURR_CALC',
  message: 'ERR_CURR_CALC: Błąd obliczeń walut, przepełnienie przy mnożeniu lub dzieleniu',
},
{
  code: 2041,
  codeStr: 'ERR_TR_END_VAL_0',
  message: 'ERR_TR_END_VAL_0: Próba zakończenia pozytywnego paragonu wartością 0',
},
{
  code: 2042,
  codeStr: 'ERR_REP_PER_DATE_FORMAT_FROM',
  message: 'ERR_REP_PER_DATE_FORMAT_FROM: Błędy formatu daty początkowej raportu okresowego',
},
{
  code: 2043,
  codeStr: 'ERR_REP_PER_DATE_FORMAT_TO',
  message: 'ERR_REP_PER_DATE_FORMAT_TO: Błędy formatu daty końcowej raportu okresowego',
},
{
  code: 2044,
  codeStr: 'ERR_REP_PER_CURR_MONTH',
  message: 'ERR_REP_PER_CURR_MONTH: Próba wykonania raportu miesięcznego w danym miesiącu',
},
{
  code: 2045,
  codeStr: 'ERR_REP_PER_DATE_START_GT_CURR',
  message: 'ERR_REP_PER_DATE_START_GT_CURR: Data początkowa późniejsza od bieżącej daty',
},
{
  code: 2046,
  codeStr: 'ERR_REP_PER_DATE_END_GT_FISK',
  message: 'ERR_REP_PER_DATE_END_GT_FISK: Data końcowa wcześniejsza od daty fiskalizacji',
},
{
  code: 2047,
  codeStr: 'ERR_REP_PER_NUM_ZERO',
  message: 'ERR_REP_PER_NUM_ZERO: Numer początkowy lub końcowy równy zero',
},
{
  code: 2048,
  codeStr: 'ERR_REP_PER_NUM_FROM_GT_END',
  message: 'ERR_REP_PER_NUM_FROM_GT_END: Numer początkowy większy od numeru końcowego',
},
{
  code: 2049,
  codeStr: 'ERR_REP_PER_NUM_TOO_BIG',
  message: 'ERR_REP_PER_NUM_TOO_BIG: Numer raportu zbyt duży',
},
{
  code: 2050,
  codeStr: 'ERR_REP_PER_DATE_END_GT_START',
  message: 'ERR_REP_PER_DATE_END_GT_START: Data początkowa późniejsza od daty końcowej',
},
{
  code: 2051,
  codeStr: 'ERR_REP_TXT_NO_MEM',
  message: 'ERR_REP_TXT_NO_MEM: Brak pamięci w buforze tekstów',
},
{
  code: 2052,
  codeStr: 'ERR_TR_NO_MEM',
  message: 'ERR_TR_NO_MEM: Brak pamięci w buforze transakcji',
},
{
  code: 2054,
  codeStr: 'ERR_TR_END_PAYMENT',
  message: 'ERR_TR_END_PAYMENT: Formy płatności nie pokrywają kwoty do zapłaty lub reszty',
},
{
  code: 2055,
  codeStr: 'ERR_LINE',
  message: 'ERR_LINE: Błędna linia',
},
{
  code: 2056,
  codeStr: 'ERR_EMPTY_TXT',
  message: 'ERR_EMPTY_TXT: Tekst pusty',
},
{
  code: 2057,
  codeStr: 'ERR_SIZE',
  message: 'ERR_SIZE: Przekroczony rozmiar',
},
{
  code: 2058,
  codeStr: 'ERR_LINE_CNT',
  message: 'ERR_LINE_CNT: Błędna liczba linii',
},
{
  code: 2060,
  codeStr: 'ERR_TR_BAD_STATE',
  message: 'ERR_TR_BAD_STATE: Błędny stan transakcji',
},
{
  code: 2062,
  codeStr: 'ERR_PRN_START',
  message: 'ERR_PRN_START: Jest wydrukowana część jakiegoś dokumentu',
},
{
  code: 2063,
  codeStr: 'ERR_PAR',
  message: 'ERR_PAR: Błąd parametru',
},
{
  code: 2064,
  codeStr: 'ERR_FTR_NO_HDR',
  message: 'ERR_FTR_NO_HDR: Brak rozpoczęcia wydruku lub transakcji',
},
{
  code: 2067,
  codeStr: 'ERR_PRN_CFG_SET',
  message: 'ERR_PRN_CFG_SET: Błąd ustawień konfiguracyjnych wydruków/drukarki',
},
{
  code: 2070,
  codeStr: 'ERR_WRONG_MAINTENANCE_TIME',
  message: 'ERR_WRONG_MAINTENANCE_TIME: Data przeglądu wcześniejsza od systemowej',
},
{
  code: 2101,
  codeStr: 'ERR_DF_DB_OVR',
  message: 'ERR_DF_DB_OVR: Zapełnienie bazy danych',
},
{
  code: 2102,
  codeStr: 'ERR_DF_DB_VAT_INACTIVE',
  message: 'ERR_DF_DB_VAT_INACTIVE: Stawka VAT nieaktywna',
},
{
  code: 2103,
  codeStr: 'ERR_DF_DB_VAT_INVALID',
  message: 'ERR_DF_DB_VAT_INVALID: Nieprawidłowa stawka VAT',
},
{
  code: 2104,
  codeStr: 'ERR_DF_DB_NAME',
  message: 'ERR_DF_DB_NAME: Błąd nazwy',
},
{
  code: 2105,
  codeStr: 'ERR_DF_DB_NAME_VAT',
  message: 'ERR_DF_DB_NAME_VAT: Błąd przypisania stawki',
},
{
  code: 2106,
  codeStr: 'ERR_DF_DB_LOCKED',
  message: 'ERR_DF_DB_LOCKED: Zablokowany',
},
{
  code: 2107,
  codeStr: 'ERR_DF_DB_NAME_NOT_FOUND',
  message: 'ERR_DF_DB_NAME_NOT_FOUND: Nie znaleziono w bazie drukarkowej',
},
{
  code: 2108,
  codeStr: 'ERR_DF_DB_NOT_OVR',
  message: 'ERR_DF_DB_NOT_OVR: Baza nie jest zapełniona',
},
{
  code: 2501,
  codeStr: 'ERR_FORM_ID',
  message: 'ERR_FORM_ID: Błędny identyfikator raportu',
},
{
  code: 2502,
  codeStr: 'ERR_FORM_LINE_NO',
  message: 'ERR_FORM_LINE_NO: Błędny identyfikator linii raportu',
},
{
  code: 2503,
  codeStr: 'ERR_FORM_HDR_NO',
  message: 'ERR_FORM_HDR_NO: Błędny identyfikator nagłówka raportu',
},
{
  code: 2504,
  codeStr: 'ERR_FORM_PAR_CNT',
  message: 'ERR_FORM_PAR_CNT: Zbyt mało parametrów raportu',
},
{
  code: 2505,
  codeStr: 'ERR_FORM_NOT_STARTED',
  message: 'ERR_FORM_NOT_STARTED: Raport nie rozpoczęty',
},
{
  code: 2506,
  codeStr: 'ERR_FORM_STARTED',
  message: 'ERR_FORM_STARTED: Raport rozpoczęty',
},
{
  code: 2507,
  codeStr: 'ERR_FORM_CMD',
  message: 'ERR_FORM_CMD: Błędny identyfikator komendy',
},
{
  code: 2521,
  codeStr: 'ERR_DB_REP_PLU_ACTIVE',
  message: 'ERR_DB_REP_PLU_ACTIVE: Raport już rozpoczęty',
},
{
  code: 2522,
  codeStr: 'ERR_DB_REP_PLU_NOT_ACTIVE',
  message: 'ERR_DB_REP_PLU_NOT_ACTIVE: Raport nie rozpoczęty',
},
{
  code: 2523,
  codeStr: 'ERR_DB_REP_PLU_VAT_ID',
  message: 'ERR_DB_REP_PLU_VAT_ID: Błędna stawka VAT',
},
{
  code: 2532,
  codeStr: 'ERR_FV_COPY_CNT',
  message: 'ERR_FV_COPY_CNT: Błędna liczba kopii faktur',
},
{
  code: 2600,
  codeStr: 'ERR_DISCNT_TYPE',
  message: 'ERR_DISCNT_TYPE: Błędny typ rabatu/narzutu',
},
{
  code: 2601,
  codeStr: 'ERR_TR_DISCNT_VALUE',
  message: 'ERR_TR_DISCNT_VALUE: Wartość rabatu/narzutu spoza zakresu',
},
{
  code: 2701,
  codeStr: 'ERR_VAT_ID',
  message: 'ERR_VAT_ID: Błąd identyfikatora stawki podatkowej',
},
{
  code: 2702,
  codeStr: 'ERR_FTRLN_ID',
  message: 'ERR_FTRLN_ID: Błędny identyfikator dodatkowej stopki',
},
{
  code: 2703,
  codeStr: 'ERR_FTRLN_CNT',
  message: 'ERR_FTRLN_CNT: Przekroczona liczba dodatkowych stopek',
},
{
  code: 2704,
  codeStr: 'ERR_ACC_LOW',
  message: 'ERR_ACC_LOW: Zbyt słaby akumulator',
},
{
  code: 2705,
  codeStr: 'ERR_PF_TYPE',
  message: 'ERR_PF_TYPE: Błędny identyfikator typu formy płatności',
},
{
  code: 2801,
  codeStr: 'ERR_DISCNT_VERIFY',
  message: 'ERR_DISCNT_VERIFY: Błąd weryfikacji wartości rabatu/narzutu',
},
{
  code: 2802,
  codeStr: 'ERR_LNTOT_VERIFY',
  message: 'ERR_LNTOT_VERIFY: Błąd weryfikacji wartości linii sprzedaży',
},
{
  code: 2803,
  codeStr: 'ERR_PACKTOT_VERIFY',
  message: 'ERR_PACKTOT_VERIFY: Błąd weryfikacji wartości opakowania',
},
{
  code: 2804,
  codeStr: 'ERR_CURRTOT_VERIFY',
  message: 'ERR_CURRTOT_VERIFY: Błąd weryfikacji wartości formy płatności',
},
{
  code: 2805,
  codeStr: 'ERR_ENDTOT_VERIFY',
  message: 'ERR_ENDTOT_VERIFY: Błąd weryfikacji wartości fiskalnej',
},
{
  code: 2806,
  codeStr: 'ERR_ENDPACKPLUS_VERIFY',
  message: 'ERR_ENDPACKPLUS_VERIFY: Błąd weryfikacji wartości opakowań dodatnich',
},
{
  code: 2807,
  codeStr: 'ERR_ENDPACKMINUS_VERIFY',
  message: 'ERR_ENDPACKMINUS_VERIFY: Błąd weryfikacji wartości opakowań ujemnych',
},
{
  code: 2808,
  codeStr: 'ERR_ENDPAYMENT_VERIFY',
  message: 'ERR_ENDPAYMENT_VERIFY: Błąd weryfikacji wartości wpłaconych form płatności',
},
{
  code: 2809,
  codeStr: 'ERR_ENDCHANGE_VERIFY',
  message: 'ERR_ENDCHANGE_VERIFY: Błąd weryfikacji wartości reszty',
},
{
  code: 2851,
  codeStr: 'ERR_STORNO_QNT',
  message: 'ERR_STORNO_QNT: Błąd stornowania, błędna ilość',
},
{
  code: 2852,
  codeStr: 'ERR_STORNO_AMT',
  message: 'ERR_STORNO_AMT: Błąd stornowania, błędna wartość',
},
{
  code: 2900,
  codeStr: 'ERR_EC_NOT_ENOUGH_SPACE',
  message: 'ERR_EC_NOT_ENOUGH_SPACE: Stan kopii elektronicznej nie pozwala na wydrukowanie tego dokumentu. Brak nośnika lub operacja na nośniku trwa',
},
{
  code: 2901,
  codeStr: 'ERR_EC_EDM_NOT_READY',
  message: 'ERR_EC_EDM_NOT_READY: Pamięć podręczna kopii elektronicznej zawiera zbyt dużą ilość danych. Brak pliku na nośniku.',
},
{
  code: 2903,
  codeStr: 'ERR_EC_DATA_PENDING',
  message: 'ERR_EC_DATA_PENDING: Nieprawidłowy wynik testu.',
},
{
  code: 2911,
  codeStr: 'ERR_EC_EDM_FILE_NOT_FOUND',
  message: 'ERR_EC_EDM_FILE_NOT_FOUND: Nie można zmienić 2 raz waluty ewidencyjnej po RD.',
},
{
  code: 2913,
  codeStr: 'ERR_EC_TEST_FAILED',
  message: 'ERR_EC_TEST_FAILED: Próba ustawienia już ustawionej waluty.',
},
{
  code: 3051,
  codeStr: 'ERR_CURRENCY_ALREADY_CHANGED',
  message: 'ERR_CURRENCY_ALREADY_CHANGED: Błędna nazwa waluty.',
},
{
  code: 3052,
  codeStr: 'ERR_CURRENCY_SAME',
  message: 'ERR_CURRENCY_SAME: Automatyczna zmiana waluty.',
},
{
  code: 3053,
  codeStr: 'ERR_CURRENCY_INVALID_NAME',
  message: 'ERR_CURRENCY_INVALID_NAME: Błędna wartość przelicznika kursu.',
},
{
  code: 3054,
  codeStr: 'ERR_CURRENCY_SHOULD_CHANGE',
  message: 'ERR_CURRENCY_SHOULD_CHANGE: Przekroczono maksymalną liczbę zmian walut.',
},
{
  code: 3055,
  codeStr: 'ERR_CURRENCY_RATE',
  message: 'ERR_CURRENCY_RATE: Błąd zmiany waluty.',
},
{
  code: 3056,
  codeStr: 'ERR_CURRENCY_CHNG_CNT',
  message: 'ERR_CURRENCY_CHNG_CNT: Błędna liczba walut w bazie.',
}];
