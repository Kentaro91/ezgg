export interface Runeword {
  name: string;
  nameEn: string;
  runes: string[];
  sockets: number;
  bases: string[];
  level: number;
  stats: string;
  category: 'weapon' | 'armor' | 'helmet' | 'shield' | 'all';
}

export const runes = [
  'El', 'Eld', 'Tir', 'Nef', 'Eth', 'Ith', 'Tal', 'Ral', 'Ort', 'Thul',
  'Amn', 'Sol', 'Shael', 'Dol', 'Hel', 'Io', 'Lum', 'Ko', 'Fal', 'Lem',
  'Pul', 'Um', 'Mal', 'Ist', 'Gul', 'Vex', 'Ohm', 'Lo', 'Sur', 'Ber',
  'Jah', 'Cham', 'Zod',
] as const;

export const runewordsData: Runeword[] = [
  {
    name: '잠행', nameEn: 'Stealth',
    runes: ['Tal', 'Eth'], sockets: 2,
    bases: ['갑옷'], level: 17,
    stats: '마법 데미지 감소 +3\n민첩 +6\n패캐 +25%\n달려가 속도 +25%\n마나 재생 +15%\n독 저항 +30',
    category: 'armor',
  },
  {
    name: '잎새', nameEn: 'Leaf',
    runes: ['Tir', 'Ral'], sockets: 2,
    bases: ['스태프 (오브 ✕)'], level: 19,
    stats: '화염 스킬 +3\n방어 +33%\n냉기 저항 +33%\n+2 마나/킬',
    category: 'weapon',
  },
  {
    name: '전승', nameEn: 'Lore',
    runes: ['Ort', 'Sol'], sockets: 2,
    bases: ['투구'], level: 27,
    stats: '모든 스킬 +1\n에너지 +10\n번개 저항 +30\n데미지 감소 7\n마나/킬 +2',
    category: 'helmet',
  },
  {
    name: '영혼', nameEn: 'Spirit',
    runes: ['Tal', 'Thul', 'Ort', 'Amn'], sockets: 4,
    bases: ['검 / 방패'], level: 25,
    stats: '모든 스킬 +2\nFCR +25-35%\n마나 +89-112\n활력 +22\n흡수 (방패: 올저항 +22-36)',
    category: 'all',
  },
  {
    name: '통찰', nameEn: 'Insight',
    runes: ['Ral', 'Tir', 'Tal', 'Sol'], sockets: 4,
    bases: ['미늘창 / 폴암 (용병)'], level: 27,
    stats: '명상 오라 Lv.12-17\n크리티컬 +35%\n모든 스킬 +1-6\n공속 +200-260%',
    category: 'weapon',
  },
  {
    name: '연기', nameEn: 'Smoke',
    runes: ['Nef', 'Lum'], sockets: 2,
    bases: ['갑옷'], level: 37,
    stats: '올저항 +50\n방어 +75%\n빠른 피격 회복 +20%\n에너지 +10\n감속 해제',
    category: 'armor',
  },
  {
    name: '고대인의 서약', nameEn: "Ancients' Pledge",
    runes: ['Ral', 'Ort', 'Tal'], sockets: 3,
    bases: ['방패'], level: 21,
    stats: '올저항 +43\n방어 +50%\n데미지 감소 10%',
    category: 'shield',
  },
  {
    name: '권위', nameEn: 'Authority',
    runes: ['Shael', 'Eld'], sockets: 2,
    bases: ['방패'], level: 21,
    stats: '빠른 블록 +20%\n블록 확률 +15%\n방어 +60%\n체력 +30',
    category: 'shield',
  },
  {
    name: '충성', nameEn: 'Obedience',
    runes: ['Hel', 'Ko', 'Thul', 'Eth', 'Fal'], sockets: 5,
    bases: ['폴암'], level: 41,
    stats: '공속 +40%\n데미지 +370%\n크러싱 블로우 +40%\n올저항 +20-30\n방어 +200-300',
    category: 'weapon',
  },
  {
    name: '수수께끼', nameEn: 'Enigma',
    runes: ['Jah', 'Ith', 'Ber'], sockets: 3,
    bases: ['갑옷'], level: 65,
    stats: '텔레포트 +1\n모든 스킬 +2\n달려가 속도 +45%\n힘 +0.75/레벨\n방어 +775',
    category: 'armor',
  },
  {
    name: '비페르마기', nameEn: 'Vipermagi (Unique)',
    runes: [], sockets: 0,
    bases: ['유니크 갑옷'], level: 30,
    stats: '모든 스킬 +1\nFCR +30%\n올저항 +20-35\n마법 데미지 감소 +9-13',
    category: 'armor',
  },
  {
    name: '불사조', nameEn: 'Phoenix',
    runes: ['Vex', 'Vex', 'Lo', 'Jah'], sockets: 4,
    bases: ['방패 / 무기'], level: 65,
    stats: '구원 오라 Lv.10-15\n화염 흡수 +350-400%\n화염 데미지 +350-400\n방어 +50%\n올저항 +15-21',
    category: 'all',
  },
  {
    name: '순종', nameEn: 'Compliance',
    runes: ['Shael', 'Um', 'Thul', 'Amn'], sockets: 4,
    bases: ['검 / 홀'], level: 43,
    stats: 'FCR +40%\n모든 스킬 +2\n마나 +100\n올저항 +20\n냉기 데미지 추가',
    category: 'weapon',
  },
];
