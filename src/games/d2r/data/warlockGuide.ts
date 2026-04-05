export type TagType =
  | 'skill'
  | 'stat'
  | 'item'
  | 'tip'
  | 'warning'
  | 'map'
  | 'quest'
  | 'boss'
  | 'farm';
export type BadgeColor = 'fire' | 'magic' | 'echo' | 'gold' | 'danger';

export interface GuideStep {
  badge: string;
  badgeColor: BadgeColor;
  tags?: { label: string; type: TagType }[];
  title: string;
  content: string;
  highlight?: boolean;
  classId?: string; // 특정 직업 선택 시에만 표시
}

export interface GuideSection {
  type: 'steps' | 'act-header';
  actTitle?: string;
  steps?: GuideStep[];
}

export interface GuidePhase {
  id: string;
  label: string;
  title: string;
  subtitle: string;
  sections: GuideSection[];
  classOnly?: string; // 특정 직업 선택 시에만 탭 표시
}

export interface D2RClass {
  id: string;
  name: string;
  nameEn: string;
}

export const d2rClasses: D2RClass[] = [
  { id: 'amazon', name: '아마존', nameEn: 'Amazon' },
  { id: 'sorceress', name: '소서리스', nameEn: 'Sorceress' },
  { id: 'necromancer', name: '강령술사', nameEn: 'Necromancer' },
  { id: 'paladin', name: '성기사', nameEn: 'Paladin' },
  { id: 'barbarian', name: '야만용사', nameEn: 'Barbarian' },
  { id: 'druid', name: '드루이드', nameEn: 'Druid' },
  { id: 'assassin', name: '암살자', nameEn: 'Assassin' },
  { id: 'warlock', name: '악마술사', nameEn: 'Warlock' },
]

// ─── 공통 액트 진행 (맵/던전 길찾기 포함) ───

const act1Sections = (diff: 'normal' | 'nm' | 'hell'): GuideSection[] => [
  { type: 'act-header', actTitle: '액트 1' },
  {
    type: 'steps',
    steps: [
      {
        badge: '1',
        badgeColor: 'magic',
        tags: [{ label: '퀘스트', type: 'quest' }],
        title: '악의 소굴 (Den of Evil)',
        content:
          '혈야(Blood Moor)에서 동굴 입구 발견 → 내부 몬스터 전부 처치.\n입구에 포탈 열고 → 차가운 평야 웨이포인트 먼저 확보 → 마을 귀환 → 포탈로 소굴 진입. 동선 절약.\n\n길찾기: 소굴 내부는 1층. 왼쪽 벽 따라가기로 전부 순회 가능.\n보상: 스킬 포인트 +1 (아카라)',
      },
      {
        badge: '2',
        badgeColor: 'magic',
        tags: [{ label: '퀘스트', type: 'quest' }],
        title: "자매의 매장지 (Sisters' Burial Grounds)",
        content:
          '차가운 평야 → 매장지(Burial Grounds)에서 블러드 레이븐 처치.\n\n길찾기: 차가운 평야 웨이포인트 근처에서 매장지 입구 탐색.\n보상: 용병 1명 무료 고용 (카샤)',
      },
      {
        badge: '3',
        badgeColor: 'magic',
        tags: [{ label: '퀘스트', type: 'quest' }],
        title: '케인 구출 (The Search for Cain)',
        content:
          '차가운 평야 → 스톤필드(웨이포인트 확보) → 지하통로 → 어둠의 숲.\n\n① 어둠의 숲에서 이니프스의 나무 → 두루마리 획득 (웨이포인트 확보)\n② 두루마리를 아카라에게 → 돌기둥 순서 해독\n③ 스톤필드 돌기둥 서클에서 순서대로 클릭 → 트리스트럼 포탈 개방\n④ 트리스트럼에서 케인 우리 클릭 → 구출\n\n길찾기:\n- 지하통로 1층: 왼쪽 벽 따라가기 → 2층 출구 → 어둠의 숲\n- 어둠의 숲: 지형 경계 따라가면 나무 발견\n\n보상: 케인 식별 무료',
      },
      ...(diff === 'normal'
        ? [
            {
              badge: '4',
              badgeColor: 'magic' as BadgeColor,
              tags: [{ label: '파밍', type: 'farm' as TagType }],
              title: '잊힌탑 타워런 (Forgotten Tower)',
              content:
                '어둠의 숲 → 블랙 마쉬(웨이포인트 확보) → 잊힌탑 입구.\n목표: 잠행(탈+에드), 잎새(티르+랄) 룬 수급.\n\n잊힌탑 내부 (지하 5층):\n- 각 층에서 통로 나온 방향 기준 좌회전 → 다음 층 계단\n- 5층 끝: 카운테스 처치 → 룬 다수 드롭\n- 5층에 확정 방어구/무기 거치대 있음\n\n15레벨까지만 돌리고 안 나오면 액트 진행.\n잠행용 2소켓 갑옷, 잎새용 2소켓 스태프도 같이 수급.',
            },
          ]
        : diff === 'nm'
          ? [
              {
                badge: '4',
                badgeColor: 'gold' as BadgeColor,
                tags: [{ label: '파밍', type: 'farm' as TagType }],
                title: '잊힌탑 타워런 (핵심!)',
                content:
                  '블랙 마쉬 → 잊힌탑. 나이트메어 카운테스에서 룬워드 재료 수급.\n\n목표 룬워드:\n- 영혼(Spirit): 탈+줄+오르트+앰 → 4소켓 검\n- 통찰(Insight): 랄+티르+탈+솔 → 4소켓 미늘창(용병)\n- 전승(Lore): 오르트+솔 → 2소켓 투구\n- 권위(Authority): 샤엘+레드 → 2소켓 방패\n\n양손검 영혼 가능! 나이트메어 자이언트소드/바스타드소드/클레이모어 = 라르주크 4소켓 확정.\n✕ 투핸드소드/플랑베르즈/그레이트소드 ✕ 크리스탈소드(6소켓 위험) ✕ 노말 드랍검(카우방 제외)',
                highlight: true,
              },
            ]
          : [
              {
                badge: '4',
                badgeColor: 'magic' as BadgeColor,
                tags: [{ label: '파밍', type: 'farm' as TagType }],
                title: '잊힌탑 타워런',
                content:
                  '블랙 마쉬 → 잊힌탑. 헬 카운테스: 고급 룬 드랍 가능 (Ist까지).\n여유 있으면 돌려볼 만함. 길찾기는 동일: 좌회전 규칙.',
              },
            ]),
      ...(diff === 'normal'
        ? [
            {
              badge: '5',
              badgeColor: 'magic' as BadgeColor,
              tags: [{ label: 'Lv.8', type: 'item' as TagType }],
              title: '3줄 벨트 도박',
              content:
                '기드에게 도박. 물약 저장량↑.\n화염고리 +1 붙은 단검/전용책 사용하면 딜↑',
            },
          ]
        : []),
      {
        badge: diff === 'normal' ? '6' : '5',
        badgeColor: 'magic',
        tags: [{ label: '퀘스트', type: 'quest' }],
        title: '호라드림 도구 (Tools of the Trade)',
        content:
          '블랙 마쉬 → 타모에 고지 → 수도원 정문 → 외부 회랑(웨이포인트 확보) → 병영.\n병영에서 스미스(The Smith) 처치 → 호라드림 말루스 획득 → 찰씨에게 반환.\n\n보상: 마법부여 (일반→레어 변환). ' +
          (diff === 'normal'
            ? '신발에 사용하면 달려가 기대.'
            : '아끼는 장비에 사용.'),
      },
      {
        badge: diff === 'normal' ? '7' : '6',
        badgeColor: 'magic',
        tags: [{ label: '맵', type: 'map' }],
        title: '외부 회랑 → 감옥 → 내부 회랑 → 카타콤',
        content:
          '외부 회랑 길찾기: 분수대 있으면 → 분수대 바라보는 방향. 없으면 → 1시 방향.\n\n감옥(Jail) 1~3층:\n- 1층: 직진 → 다음층 / 왼쪽 → 웨이포인트\n- 2층: 직진 → 다음층 (웨이포인트 확보)\n- 3층: 왼쪽 → 내부 회랑 출구\n\n내부 회랑 → 대성당 → 카타콤 진입.\n\n카타콤(Catacombs) 1~4층:\n- 1층: 방향 규칙 없음 (양쪽 문+복도 구조가 출구 힌트)\n- 2층: 웨이포인트 기준 우회전 → 다음층 (웨이포인트 확보 필수!)\n- 3층: 예측 불가 (출구는 맵 가장자리 경향)\n- 4층: 고정 맵, 앤다리엘 보스방',
      },
      {
        badge: diff === 'normal' ? '8' : '7',
        badgeColor: 'danger',
        tags: [{ label: '보스', type: 'boss' }],
        title: '앤다리엘 (Andariel)',
        content:
          '해독 포션 미리 섭취 필수. 독 저항 확보가 핵심. 화염에 약함.\n' +
          (diff === 'normal' ? '처치 후 워리브에게 말 걸어 액트 2 이동. 액트2 도착 시 오라 용병 고용.' :
           diff === 'nm' ? '나이트메어부터 독 데미지 매우 큼 → 해독 포션 넉넉히.' :
           '헬 안다리엘 독 데미지 극강 → 독저항 최대한 확보 권장.'),
      },
      {
        badge: '▸', badgeColor: 'echo',
        tags: [{ label: '악마술사', type: 'tip' }],
        title: diff === 'hell' ? '무기력 + 심연' : '무기력 인장 + 화염고리',
        content: diff === 'hell' ? '심연으로 안정적 딜. 염소인간/속박 악마 몸빵.' : '화염고리 한 방이면 충분. 염소인간 몸빵.',
        classId: 'warlock',
      },
    ],
  },
];

const act2Sections = (diff: 'normal' | 'nm' | 'hell'): GuideSection[] => [
  { type: 'act-header', actTitle: '액트 2' },
  {
    type: 'steps',
    steps: [
      {
        badge: '1',
        badgeColor: 'magic',
        tags: [{ label: '퀘스트', type: 'quest' }],
        title: "라다먼트의 소굴 (Radament's Lair)",
        content:
          '루트 골레인 → 하수도 1층(웨이포인트 확보) → 2층 → 3층.\n3층 큰 방에서 라다먼트 처치.\n\n길찾기: 3층 진입 후 벽 따라가기 → 큰 방 발견.\n보상: 스킬 포인트 +1 (호라드림의 책)',
      },
      {
        badge: '2',
        badgeColor: 'magic',
        tags: [{ label: '맵', type: 'map' }],
        title: '건조 구릉 → 죽은 자의 전당 (호라트릭 큐브)',
        content:
          '루트 골레인 → 바위 황무지 → 건조 구릉(웨이포인트 확보).\n건조 구릉에서 죽은 자의 전당 입구 발견.\n\n죽은 자의 전당 (3층):\n- 1층: 벽 따라가기 → 계단\n- 2층: 웨이포인트 있음\n- 3층: 황금상자에서 호라트릭 큐브 획득\n\n길찾기: 세 갈래 → 가운데 기준 왼쪽. (액트2 던전 공통)',
      },
      {
        badge: '3',
        badgeColor: 'magic',
        tags: [{ label: '동선', type: 'map' }],
        title: '망자의 전당 동선 팁',
        content:
          '죽은 자의 전당 입구 앞 포탈 → 건조 구릉에서 머나먼 오아시스까지 이동 → 웨이포인트 확보 → 마을 → 포탈로 복귀.\n동선 절약의 핵심!',
      },
      {
        badge: '4',
        badgeColor: 'magic',
        tags: [{ label: '퀘스트', type: 'quest' }],
        title: '구더기 소굴 (Maggot Lair) → 직원 상부',
        content:
          '머나먼 오아시스(웨이포인트 확보) → 구더기 소굴 입구.\n\n구더기 소굴 (3층) — D2R 악명 높은 던전:\n- 통로가 매우 좁음 (1명만 통과)\n- 1,2층: 우회전 경향\n- 3층: 1시 방향 확정\n- 3층 황금상자: 직원 상부(Staff of Kings) 획득\n\n팁: 갈림길에서 더 넓은 통로 선택 → 올바른 경로일 확률↑',
      },
      {
        badge: '5',
        badgeColor: 'magic',
        tags: [{ label: '퀘스트', type: 'quest' }],
        title: '독사 신전 (Claw Viper Temple) → 바이퍼 부적',
        content:
          '머나먼 오아시스 → 잃어버린 도시(웨이포인트 확보) → 독사의 계곡 → 독사 신전.\n\n독사 신전 (2층):\n- 1층: 중간 크기. 계단 찾기\n- 2층: 매우 작음. 중앙 성소 파괴 → 태양 퀘스트 완료 + 바이퍼 부적 획득\n\n⚠ 2층 몬스터 밀집 → 진입 시 주의!',
      },
      ...(diff === 'normal'
        ? [
            {
              badge: '6',
              badgeColor: 'magic' as BadgeColor,
              tags: [{ label: 'Lv.17', type: 'item' as TagType }],
              title: '잠행(Stealth) 제작',
              content:
                '2소켓 갑옷 + 탈+에드. ⚠ 매직(파란색) 갑옷 ✕!\n달려가 속도↑, 패캐↑, 마나 재생↑ 등 초반 핵심 장비.',
            },
            {
              badge: '7',
              badgeColor: 'echo' as BadgeColor,
              tags: [{ label: '악마술사', type: 'item' as TagType }],
              title: '잎새(Leaf) 제작',
              content:
                '2소켓 스태프 + 티르+랄. 화염스킬 +3. ⚠ 오브(Orb)형 ✕ 반드시 스태프!',
              classId: 'warlock',
            },
          ]
        : []),
      {
        badge: diff === 'normal' ? '8' : '6',
        badgeColor: 'magic',
        tags: [{ label: '조합', type: 'item' }],
        title: '호라드림 지팡이 조합',
        content:
          '호라트릭 큐브에 직원 상부 + 바이퍼 부적 넣고 변환 → 호라드림 지팡이 완성.\n이 지팡이는 탈 라샤 무덤 오리피스에 사용.',
      },
      {
        badge: diff === 'normal' ? '9' : '7',
        badgeColor: 'magic',
        tags: [{ label: '퀘스트', type: 'quest' }],
        title: '아케인 성역 → 소환사 처치',
        content:
          '루트 골레인 → 궁전 → 하렘 1~2층 → 궁전 지하 1~3층 → 아케인 성역.\n궁전 지하 2층: 웨이포인트 확보 필수!\n\n아케인 성역:\n- 중앙에서 4갈래 길 → 소환사는 4개 중 1개 끝에 위치\n- 운 나쁘면 4번 다 가봐야 함 → 텔포봉 있으면 빠르게 탐색\n- 통로에서 떨어져도 시작점으로 복귀 (사망 ✕)\n\n소환사 처치 후:\n- 일지에서 올바른 탈 라샤 무덤 기호 확인\n- 소환사 뒤 포탈 → 마법사의 협곡(웨이포인트 확보)',
      },
      {
        badge: diff === 'normal' ? '10' : '8',
        badgeColor: 'magic',
        tags: [{ label: '맵', type: 'map' }],
        title: '마법사의 협곡 → 탈 라샤의 무덤',
        content:
          '협곡에 무덤 입구 7개 → 각 입구 위 기호 확인.\n소환사 일지의 기호와 일치하는 무덤이 진짜.\n\n탈 라샤 무덤 내부:\n- 세 갈래 → 왼쪽 경향\n- 맵 끝 오리피스에 호라드림 지팡이 사용 → 두리엘 방 포탈 개방',
      },
      {
        badge: diff === 'normal' ? '11' : '9',
        badgeColor: 'danger',
        tags: [{ label: '보스', type: 'boss' }],
        title: '두리엘 (Duriel)',
        content:
          '매우 작은 방에서 전투 → 도망 불가!\n해동 포션 10~15개 미리 연속 섭취 (효과 중첩!) → 냉기 저항↑.\n용병에게도 해동 포션 먹이기.\n' +
          (diff === 'nm' ? '나이트메어 두리엘은 냉기+물리 강화 → 해동 포션 여유분.' :
           diff === 'hell' ? '헬 두리엘은 냉기+물리 극강 → 체력 물약 대량 준비.' : ''),
      },
      {
        badge: '▸', badgeColor: 'echo',
        tags: [{ label: '악마술사', type: 'tip' }],
        title: diff === 'hell' ? '무기력 + 심연' : '무기력 인장 + 화염파도',
        content: diff === 'hell' ? '심연으로 처리. 속박 악마가 있으면 탱킹 가능.' : '화염파도로 딜. 염소인간 탱킹.',
        classId: 'warlock',
      },
    ],
  },
];

const act3Sections = (diff: 'normal' | 'nm' | 'hell'): GuideSection[] => [
  { type: 'act-header', actTitle: '액트 3' },
  {
    type: 'steps',
    steps: [
      ...(diff !== 'nm'
        ? [
            {
              badge: '1',
              badgeColor: 'magic' as BadgeColor,
              tags: [{ label: '팁', type: 'tip' as TagType }],
              title: diff === 'normal' ? '화염저항 챙기기' : '저항 챙기기',
              content:
                diff === 'normal'
                  ? '액트3~4 화염 아픔. 2소켓 투구에 랄 2개 → 화염저항 확보.'
                  : '헬 액트3 몬스터 데미지 극강. 올저항 최대한 확보.\n냉기/번개 저항 특히 중요 (카운슬 멤버 대비).',
            },
          ]
        : [
            {
              badge: '1',
              badgeColor: 'echo' as BadgeColor,
              tags: [{ label: '악마술사', type: 'tip' as TagType }],
              title: '심연 빌드 운영 (전환 후)',
              content:
                '액트3 클리어 후 빌드 전환! 아카라에게 스킬/스탯 초기화 → 화염 → 심연/독기사슬.\n자세한 내용은 "빌드 전환" 탭 참고.\n\n전환 후 운영: 심연+인장:죽음. 몹 많을 때 독기사슬 추가.',
              highlight: true,
              classId: 'warlock',
            },
          ]),
      {
        badge: '2',
        badgeColor: 'magic',
        tags: [{ label: '퀘스트', type: 'quest' }],
        title: '황금 새 (The Golden Bird)',
        content:
          '거미숲 이후 야외 지역에서 유니크 몬스터 처치 시 비취 조각상 드롭.\n메셰프 → 황금 새 → 알코어에게 반환.\n\n보상: 영구 생명력 +20 포션. 반드시 챙길 것!',
      },
      {
        badge: '3',
        badgeColor: 'magic',
        tags: [{ label: '맵', type: 'map' }],
        title: '거미숲 (Spider Forest)',
        content:
          '쿠라스트 부두에서 출발.\n\n거미숲에 입구 3개: 퀘장소 1 + 웨이포인트 1 + 꽝 1.\n- 거미 동굴(Spider Cavern): 칼림의 눈 획득 (황금상자)\n- 거미집 소굴(Arachnid Lair): 퀘스트 무관 (함정!)\n\n웨이포인트 확보, 거미 동굴에서 칼림의 눈 획득.',
      },
      {
        badge: '4',
        badgeColor: 'magic',
        tags: [{ label: '맵', type: 'map' }],
        title: '거대습지 → 학살자밀림 (Flayer Jungle)',
        content:
          '거미숲 → 거대습지 → 학살자밀림.\n⚠ 거대습지↔학살자밀림 떨어진 경우 있음 → 거미숲에서 바로 학살자밀림 연결되기도 함.\n\n학살자밀림에서:\n- 학살자 지하(Flayer Dungeon) 입구 찾기\n- 지브딘(Gidbinn) 단검: 불타는 제단 근처 유니크 처치 후 획득 → 오차에게 반환\n\n웨이포인트 확보.',
      },
      {
        badge: '5',
        badgeColor: 'magic',
        tags: [{ label: '퀘스트', type: 'quest' }],
        title: '학살자 지하 (Flayer Dungeon) → 칼림의 뇌',
        content:
          "학살자 지하 (3층):\n- 1,2층: 좌회전 경향. 비교적 작은 맵\n- 3층: 황금상자에서 칼림의 뇌(Khalim's Brain) 획득\n\n⚠ 학살자(Flayer)+샤먼 밀집 → 원거리 공격 주의.",
      },
      {
        badge: '6',
        badgeColor: 'magic',
        tags: [{ label: '동선', type: 'map' }],
        title: '하부 쿠라스트 → 쿠라스트 바자 → 상부 쿠라스트',
        content:
          '학살자밀림 → 하부 쿠라스트(웨이포인트 확보) → 쿠라스트 바자(웨이포인트 확보) → 상부 쿠라스트(웨이포인트 확보).\n\n쿠라스트 바자/상부 쿠라스트의 사원 6개 중:\n- 폐허 사원(Ruined Temple): 라의 태양석 → 알코어에게 반환 (스탯 +5)\n\n하수도 입구: 상부 쿠라스트 또는 바자에 위치.',
      },
      {
        badge: '7',
        badgeColor: 'magic',
        tags: [{ label: '퀘스트', type: 'quest' }],
        title: '쿠라스트 하수도 → 칼림의 심장',
        content:
          "하수도 (2층):\n- 1층 → 2층 이동. 레버로 문 열기 구조 있음\n- 2층 황금상자에서 칼림의 심장(Khalim's Heart) 획득\n\n길찾기: 벽 따라가기 유효.",
      },
      {
        badge: '8',
        badgeColor: 'magic',
        tags: [{ label: '퀘스트', type: 'quest' }],
        title: '트래빈칼 (Travincal) → 칼림의 의지',
        content:
          '상부 쿠라스트 → 트래빈칼(웨이포인트 확보).\n\n하이 카운슬 3인 처치 → 칼림의 연장(Flail) 드롭.\n호라트릭 큐브에 눈+뇌+심장+연장 → 칼림의 의지 조합.\nCompelling Orb를 칼림의 의지로 파괴 → 증오의 영속 진입.\n\n' +
          (diff === 'hell'
            ? '⚠ 헬 카운슬: 히드라/블리자드 사용 → 화염/냉기 저항 필수.'
            : '카운슬은 히드라/블리자드 사용 → 화염/냉기 저항 챙기기.'),
      },
      ...(diff === 'normal'
        ? [
            {
              badge: '9',
              badgeColor: 'gold' as BadgeColor,
              tags: [{ label: '장비', type: 'item' as TagType }],
              title: '텔포봉 노가다',
              content:
                '오르무스에게서 충전 순간이동 스태프 구매. Lv.24 이전은 빨간색만 확인.\n안 팔면 웨이로 밖 나갔다 복귀 → 상점 초기화.\n골드 부족 시: 매직 스태프 + 최악급 보석 3개 큐빙 → 스킬 스태프 → 비싸게 판매.',
            },
          ]
        : []),
      {
        badge: diff === 'normal' ? '10' : '9',
        badgeColor: 'magic',
        tags: [{ label: '맵', type: 'map' }],
        title: '증오의 영속 (Durance of Hate)',
        content:
          '증오의 영속 (3층) — 액트3 최종 던전:\n- 1층: 트래빈칼에서 진입. 비교적 작음. 좌회전 경향\n- 2층: 가장 크고 복잡한 층. 웨이포인트 확보 필수!\n  웨이포인트에서 왼쪽 벽 따라가기 → 3층 입구 발견\n- 3층: 작은 방. 메피스토 중앙 위치\n\n길찾기 핵심: 2층은 직진 경향. 벽 타일 패턴으로 방향 판단.',
      },
      {
        badge: diff === 'normal' ? '11' : '10',
        badgeColor: 'danger',
        tags: [{ label: '보스', type: 'boss' }],
        title: '메피스토 (Mephisto)',
        content:
          '메피스토 뒤 적색 포탈 → 액트 4 이동.\n' +
          (diff === 'hell' ? '헬 메피스토: 냉기/번개 저항 챙기면 안정적.' : ''),
      },
      {
        badge: '▸', badgeColor: 'echo',
        tags: [{ label: '악마술사', type: 'tip' }],
        title: diff === 'hell' ? '무기력 + 심연. 속박 악마 몸빵.' : diff === 'nm' ? '화염파도(전환 전) 또는 심연(전환 후)' : '무기력 + 화염파도',
        content: '염소인간/속박 악마로 탱킹하면서 딜.',
        classId: 'warlock',
      },
    ],
  },
];

const act4Sections = (diff: 'normal' | 'nm' | 'hell'): GuideSection[] => [
  { type: 'act-header', actTitle: '액트 4' },
  {
    type: 'steps',
    steps: [
      {
        badge: '1',
        badgeColor: 'magic',
        tags: [{ label: '맵', type: 'map' }],
        title: '외부 계단 → 절망의 평원 (이즈엘)',
        content:
          '판데모니엄 요새 → 외부 계단(Outer Steppes) → 절망의 평원.\n\n외부 계단: 거의 직선. 빠르게 통과.\n\n절망의 평원에서 이즈엘(Izual) 배회 중. 파란색 타락 천사.\n처치 → 보상: 스킬 포인트 +2.\n\n길찾기: 맵이 넓음. 7시, 5시, 1시 중 랜덤.\n왼쪽(7시) 먼저 → 오른쪽(1시, 5시) 확인.',
      },
      {
        badge: '2',
        badgeColor: 'magic',
        tags: [{ label: '맵', type: 'map' }],
        title: '저주받은 도시 (City of the Damned)',
        content:
          '절망의 평원 → 저주받은 도시(웨이포인트 확보).\n\n다리와 플랫폼으로 연결된 구조.\n사각형 꼭짓점(11시/5시/7시/1시)에 다음 길.\n한쪽 벽 따라가기 → 불꽃의 강으로 내려가는 계단 발견.',
      },
      {
        badge: '3',
        badgeColor: 'magic',
        tags: [{ label: '퀘스트', type: 'quest' }],
        title: '불꽃의 강 → 헬포지',
        content:
          '저주받은 도시 → 불꽃의 강(River of Flame).\n웨이포인트: 1시 방향에 위치하는 경향.\n\n헤파스토(Hephasto) 처치 → 지옥의 대장간에서 소울스톤 파괴.\n보상: 4젬 + 룬 드랍.\n' +
          (diff === 'normal'
            ? '노말: 엘~앰 룬.'
            : diff === 'nm'
              ? '나이트메어: 솔~움 룬.'
              : '헬: 헬~굴 룬.'),
      },
      ...(diff === 'hell'
        ? [
            {
              badge: '4',
              badgeColor: 'echo' as BadgeColor,
              tags: [{ label: '악마술사', type: 'tip' as TagType }],
              title: '악마 속박 → 헤파스토',
              content:
                '4막 헤파스토 속박 추천. 바알 하수인 전에 불길의 강에서 미리 속박해두기.',
              classId: 'warlock',
            },
          ]
        : []),
      {
        badge: diff === 'hell' ? '5' : '4',
        badgeColor: 'magic',
        tags: [{ label: '맵', type: 'map' }],
        title: '혼돈의 성역 (Chaos Sanctuary)',
        content:
          '불꽃의 강 끝 → 혼돈의 성역 (별 모양 구조).\n\n5개의 봉인을 활성화해야 디아블로 소환:\n- 좌측(서쪽) 날개: 봉인 1개 → Grand Vizier 소환\n- 우측(동쪽) 날개: 봉인 2개 → Infector 소환\n- 상단(북쪽) 날개: 봉인 2개 → Lord De Seis 소환\n\n권장 순서: 좌→우→상 (마지막 봉인 전 주변 정리)\n봉인은 각 날개 끝 막다른 방에 위치.',
      },
      {
        badge: diff === 'hell' ? '6' : '5',
        badgeColor: 'danger',
        tags: [{ label: '보스', type: 'boss' }],
        title: '디아블로 (Diablo)',
        content:
          '마지막 봉인 활성화 → 지진 → 디아블로 소환 (중앙 오각별).\n100만볼트(Lightning Inferno)만 피하기. 화염/번개 저항 최대.\n' +
          (diff === 'hell' ? '헬 디아블로는 모든 공격이 극강.' : ''),
      },
      {
        badge: '▸', badgeColor: 'echo',
        tags: [{ label: '악마술사', type: 'tip' }],
        title: diff === 'normal' ? '대장로: 화염면역 → 무기력+메아리+용병. 디아블로: 화염파도' : '대장로: 심연(마법)으로 OK. 디아블로: 무기력+심연',
        content: diff === 'normal' ? '화염면역 대장로는 메아리+용병으로 처리. 디아블로는 화염파도.' : '심연이 마법 속성이므로 화염면역 대장로도 문제 없음.',
        classId: 'warlock',
      },
    ],
  },
];

const act5Sections = (diff: 'normal' | 'nm' | 'hell'): GuideSection[] => [
  { type: 'act-header', actTitle: '액트 5' },
  {
    type: 'steps',
    steps: [
      ...(diff === 'normal'
        ? [
            {
              badge: '!',
              badgeColor: 'danger' as BadgeColor,
              tags: [{ label: '주의', type: 'warning' as TagType }],
              title: 'Lv.25 경험치 페널티',
              content:
                '25 미만이면 액트3 트래빈칼/학살자밀림에서 레벨링. Lv.24에 텔포봉 장착.',
            },
          ]
        : []),
      {
        badge: diff === 'normal' ? '1' : '1',
        badgeColor: 'magic',
        tags: [{ label: '퀘스트', type: 'quest' }],
        title: '포위전 → 센크 처치 (Siege on Harrogath)',
        content:
          '하로가스 → 피의 구릉(Bloody Foothills). 거의 직선 내리막.\n끝에서 센크(Shenk) 처치.\n\n⚠ 투석기 근처 폭발 데미지 주의!\n보상: 라르주크 소켓 추가 (아이템 1개) — 아끼는 장비에 사용!',
      },
      {
        badge: '2',
        badgeColor: 'magic',
        tags: [{ label: '퀘스트', type: 'quest' }],
        title: '야만용사 구출 (Rescue on Mount Arreat)',
        content:
          '피의 구릉 → 혹한의 고지(Frigid Highlands, 웨이포인트 확보).\n울타리 3곳에 각 5명씩 포로 → 총 15명 구출.\n\n길찾기: 언덕과 다리 구조. 다리 건너며 진행.\n보상: 탈+랄+오르트 룬 (고대인의 서약 룬워드 가능)',
      },
      {
        badge: '3',
        badgeColor: 'magic',
        tags: [{ label: '맵', type: 'map' }],
        title: '아리앗 고원 → 수정 통로 → 얼어붙은 강 (아냐 구출)',
        content:
          '혹한의 고지 → 아리앗 고원(Arreat Plateau, 웨이포인트 확보) → 수정 통로(Crystalline Passage, 웨이포인트 확보).\n\n수정 통로에서 얼어붙은 강(Frozen River) 분기:\n- 직선적 구조. 강 따라 진행 → 아냐 발견\n- 마을의 말라에게 보고 → 아냐 구출 완료\n\n보상: 올레지 두루마리 + 이름 새기기\n(저항 보너스: 노말+10, 나이트메어+5, 헬+0)\n\n길찾기: 수정 통로는 벽 따라가기 유효. Frozen River 입구와 Glacial Trail 출구는 서로 다른 방향.',
      },
      {
        badge: '4',
        badgeColor: 'magic',
        tags: [{ label: '맵', type: 'map' }],
        title: '빙하의 길 → 얼어붙은 동토 → 고대인의 길',
        content:
          "수정 통로 → 빙하의 길(Glacial Trail, 웨이포인트 확보) → 얼어붙은 동토(Frozen Tundra, 웨이포인트 확보) → 고대인의 길(Ancient's Way, 웨이포인트 확보).\n\n길찾기:\n- 빙하의 길: 동굴 구조. 벽 따라가기 유효\n- 얼어붙은 동토: 넓은 야외. 맵 가장자리 따라 탐색\n- 고대인의 길: 동굴. 아리앗 정상 출구 찾기가 핵심\n  출구와 Icy Cellar 입구는 서로 다른 방향 경향",
      },
      {
        badge: '5',
        badgeColor: 'magic',
        tags: [{ label: '퀘스트', type: 'quest' }],
        title: '고대인의 의식 (Rite of Passage)',
        content:
          '고대인의 길 → 아리앗 정상(Arreat Summit). 고정 레이아웃.\n제단 클릭 → 고대인 3명 활성화:\n- 탈릭(Talic): 월풀 → 물리 강타형\n- 마드왁(Madawc): 투척무기 → 원거리형\n- 코를릭(Korlic): 도약공격 → 기동형\n\n⚠ 면역 속성이 불리하면 제단 재클릭으로 리롤 가능.\n⚠ 마을 포탈 사용 시 전투 리셋됨 → 포션 보충 불가!\n' +
          (diff === 'hell'
            ? '레벨 제한: 헬 Lv.60 이상 필요.'
            : diff === 'nm'
              ? '레벨 제한: 나이트메어 Lv.40 이상 필요.'
              : '레벨 제한: 노말 Lv.20 이상 필요.') +
          '\n\n보상: 대량 경험치 + 월드스톤 수호관 진입.',
      },
      {
        badge: '6',
        badgeColor: 'magic',
        tags: [{ label: '맵', type: 'map' }],
        title: '월드스톤 수호관 (Worldstone Keep)',
        content:
          '아리앗 정상 → 월드스톤 수호관 (3층).\n각 층이 넓고 복잡 — 액트5 최난관 구간.\n\n길찾기:\n- 가운데 기준: 좌측=다음맵 / 우측=웨이포인트 / 가운데=던전 (100%는 아님)\n- 벽 따라가기 기본이지만 루프형 구조 있음 → 미니맵 활용\n- 2층: 웨이포인트 확보 필수 (바알런 시작점)\n- 3층 끝 → 파괴의 왕좌(Throne of Destruction)\n\n⚠ Soul 타입(번개)과 Stygian Doll(자폭) 매우 위험!',
      },
      {
        badge: '7',
        badgeColor: 'danger',
        tags: [{ label: '보스', type: 'boss' }],
        title: '바알 (Baal)',
        content:
          '파괴의 왕좌: 고정 레이아웃. 바알이 5웨이브 몬스터 소환:\n1. 콜레소 — 불 마법사+미니언\n2. 아치라이첼 — 독/저주 (독 구름 주의!)\n3. 바틀 — 카운슬 타입\n4. 벤타르 — 독사 타입\n5. 리스터 — 물리 강타 (가장 위험!)\n\n왕좌실 입구에서 병목 전투가 안전.\n5웨이브 후 바알 도주 → 포탈 진입 → 최종 전투.',
      },
      {
        badge: '▸', badgeColor: 'echo',
        tags: [{ label: '악마술사', type: 'tip' }],
        title: diff === 'normal' ? '화염파도로 처리. 1번째 하수인 화염면역 → 무기력+메아리' : diff === 'nm' ? '심연+독기사슬. 마법면역 하수인 → 무기력+메아리' : '심연+독기사슬. 2번째 하수인 마법면역 → 무기력+메아리+속박 악마',
        content: diff === 'hell' ? '속박 악마 몸빵 있으면 편함. 바알 자체는 쉬움.' : '바알 자체는 가장 쉬운 보스.',
        classId: 'warlock',
      },
      ...(diff === 'hell'
        ? [
            {
              badge: '✓',
              badgeColor: 'echo' as BadgeColor,
              title: '헬 바알 클리어 — 졸업!',
              content:
                '막히는 데 없음. 심연+독기사슬로 쭉.\n졸업 후 메아리 전환은 "빌드 전환" 탭 참고.',
              highlight: true,
            },
          ]
        : []),
    ],
  },
];

// ─── 난이도별 데이터 조합 ───

export const warlockGuideData: GuidePhase[] = [
  {
    id: 'normal',
    label: '노말',
    title: '노말 난이도',
    subtitle: 'Lv.1 ~ 40 | 액트 1~5 진행',
    sections: [
      ...act1Sections('normal'),
      ...act2Sections('normal'),
      ...act3Sections('normal'),
      ...act4Sections('normal'),
      ...act5Sections('normal'),
    ],
  },
  {
    id: 'nm',
    label: '나이트메어',
    title: '나이트메어 난이도',
    subtitle: '액트 1~5 진행',
    sections: [
      ...act1Sections('nm'),
      ...act2Sections('nm'),
      ...act3Sections('nm'),
      ...act4Sections('nm'),
      ...act5Sections('nm'),
    ],
  },
  {
    id: 'hell',
    label: '헬',
    title: '헬 난이도',
    subtitle: '면역 몹 등장 | 액트 1~5 진행',
    sections: [
      {
        type: 'steps',
        steps: [
          {
            badge: '!',
            badgeColor: 'danger',
            tags: [{ label: '주의', type: 'warning' }],
            title: '헬 면역 몹 주의',
            content:
              '헬부터 면역 몹 다수 등장.\n면역 속성에 따라 스킵하거나 대처 필요.',
          },
          {
            badge: '★',
            badgeColor: 'echo',
            tags: [{ label: '악마술사', type: 'tip' }],
            title: '심연(마법 속성)이므로 대부분 문제 없음',
            content:
              '마법면역은 드물지만 있음 → 무기력 + 메아리 or 스킵.\nLv.50쯤 심연+사슬 MAX → 메아리 10pt.',
            classId: 'warlock',
          },
        ],
      },
      ...act1Sections('hell'),
      ...act2Sections('hell'),
      ...act3Sections('hell'),
      ...act4Sections('hell'),
      ...act5Sections('hell'),
    ],
  },
  {
    id: 'build',
    label: '빌드 전환',
    title: '빌드 전환 가이드',
    subtitle: '화염 → 심연 (나이트메어 액트3) / 심연 → 메아리 (헬 졸업 후)',
    classOnly: 'warlock',
    sections: [
      {
        type: 'act-header',
        actTitle: '1차 전환: 화염 → 심연/독기사슬 (나이트메어 액트3 클리어 후)',
      },
      {
        type: 'steps',
        steps: [
          {
            badge: '1',
            badgeColor: 'danger',
            tags: [{ label: '스탯', type: 'stat' }],
            title: '스탯 재배분',
            content:
              '힘: 착용치만 / 민첩: 착용치만 / 활력: 나머지 전부 / 마력: 0\n초반 마력 전부 활력으로 전환. 힘/민첩 현재 장비 기준 최소한.',
          },
          {
            badge: '2',
            badgeColor: 'magic',
            tags: [{ label: '스킬', type: 'skill' }],
            title: '스킬 재배분',
            content:
              '1포인트씩: 파멸자 1, 소모 1, 칼날이동 1, 인장:무기력/분노/죽음 각 1\n주력 MAX: 심연(Abyss), 독기사슬\n\n이후: ① 심연+사슬 MAX → ② 메아리 10pt → ③ 속박1+숙련10 → ④ 독기볼트',
            highlight: true,
          },
          {
            badge: '3',
            badgeColor: 'echo',
            tags: [{ label: '운영법', type: 'tip' }],
            title: '운영법',
            content:
              '평소: 심연 + 인장:죽음\n몹多/보스: 독기사슬 추가\n마법면역: 무기력 + 메아리 (or 스킵)\n파멸자 소모: 마법저항↓ + 마법뎀↑\n숙련 10 이상 = 소모+속박 동시 운용(악마 2마리)',
          },
        ],
      },
      {
        type: 'act-header',
        actTitle: '2차 전환: 심연 → 메아리 (헬 졸업 후)',
      },
      {
        type: 'steps',
        steps: [
          {
            badge: '1',
            badgeColor: 'fire',
            tags: [{ label: '파밍', type: 'farm' }],
            title: '추천 파밍 장소',
            content:
              '카우방, 구덩이, 카생. 여유시 공포의 영역 최고 (전령=파괴참 드랍).',
          },
          {
            badge: '2',
            badgeColor: 'gold',
            tags: [{ label: '아이템', type: 'item' }],
            title: '통찰 제작 = 전환 트리거',
            content:
              '엘리트 폴암에 랄+티르+탈+솔. 추천: 에테 콜불/크립틱액스/자이언트쓰레셔.\n통찰만 들어도 웬만한 콘텐츠 다 씹어먹는 종결급.',
            highlight: true,
          },
          {
            badge: '3',
            badgeColor: 'echo',
            tags: [{ label: '빌드', type: 'skill' }],
            title: '메아리 빌드 (2차 초기화)',
            content:
              '1포인트씩: 악마 전부 1씩, 인장 전부 1씩, 주술:재앙 1\nMAX: 메아리치는 타격 MAX, 거울상칼날 MAX, 칼날이동 (남는pt), 악마숙련 20 (3마리)\n\n스탯: 힘/민첩=착용치, 나머지=올활력\nFCR: 75(가성비) or 125(종결)',
            highlight: true,
          },
          {
            badge: '4',
            badgeColor: 'echo',
            title: '종결 세팅',
            content:
              '무기: 통찰(에테 폴암) → 순종/죽숨\n방패: 영혼 → 불사조\n투구: 할리퀸/마녀단 → 2스킬20패캐 띠관\n갑옷: 비페르마기 → 수수께끼(텔포)\n장갑: 마수 → 마수/트랑장\n벨트: 스웹\n신발: 달려가 부츠 → 망령걸음(기괴+1)',
          },
        ],
      },
    ],
  },
  {
    id: 'stats',
    label: '스탯 및 스킬',
    title: '스탯 & 스킬 투자 가이드',
    subtitle: '레벨별 스킬 투자 순서 및 스탯 배분 정리',
    classOnly: 'warlock',
    sections: [
      {
        type: 'steps',
        steps: [
          {
            badge: '★',
            badgeColor: 'gold',
            tags: [{ label: '스탯', type: 'stat' }],
            title: '초반 스탯 (노말)',
            content:
              '① 마력 40까지 → ② 힘 30까지 → ③ 활력3:마력2 → ④ 마나150 이상 시 올활력\n※ 아이템 착용을 위해 힘/민첩 더 찍어도 OK',
          },
          {
            badge: '1',
            badgeColor: 'fire',
            tags: [{ label: 'Lv.2', type: 'skill' }],
            title: '염소인간 1',
            content: '고기방패 + 초반 보조딜',
          },
          {
            badge: '2',
            badgeColor: 'fire',
            tags: [{ label: 'Lv.3~4', type: 'skill' }],
            title: '독기볼트 2포인트',
            content: '스플래시 존재. 시작 대거에 +1 붙어있음.',
          },
          {
            badge: '★',
            badgeColor: 'gold',
            tags: [{ label: '아카라', type: 'skill' }],
            title: '공중부양숙련 1',
            content: '칼날이동(이동기) 선행 스킬.',
          },
          {
            badge: '3',
            badgeColor: 'fire',
            tags: [{ label: 'Lv.5', type: 'tip' }],
            title: '포인트 저장!',
            content: 'Lv.6에서 2개 동시 투자 위함.',
          },
          {
            badge: '4',
            badgeColor: 'danger',
            tags: [{ label: 'Lv.6', type: 'skill' }],
            title: '화염고리 + 인장:무기력 동시!',
            content: '화염고리 하나만으로 보통 난이도는 사실상 끝.',
            highlight: true,
          },
          {
            badge: '5',
            badgeColor: 'fire',
            tags: [{ label: 'Lv.7~16', type: 'skill' }],
            title: '화염고리 올인',
            content: '16까지 화염고리만 투자.',
          },
          {
            badge: '★',
            badgeColor: 'gold',
            tags: [{ label: '라다먼트', type: 'skill' }],
            title: '메아리치는 타격 1',
            content: '액트2 하수도. 화염면역 대처 + 최종빌드 선행.',
          },
          {
            badge: '6',
            badgeColor: 'fire',
            tags: [{ label: 'Lv.17', type: 'tip' }],
            title: '포인트 저장!',
            content: 'Lv.18에서 2개 동시 투자 위함.',
          },
          {
            badge: '7',
            badgeColor: 'danger',
            tags: [{ label: 'Lv.18', type: 'skill' }],
            title: '화염파도 + 칼날이동 동시!',
            content:
              '화염파도: 딜레이 있으므로 화염고리와 교대. 보스전 화염파도 OK.\n칼날이동: 이동기. 벽 ✕, 철창/강 ○.',
            highlight: true,
          },
          {
            badge: '8',
            badgeColor: 'fire',
            tags: [{ label: 'Lv.19~', type: 'skill' }],
            title: '화염파도 MAX → 화염고리 MAX',
            content: '⚠ 종말(Apocalypse)은 찍지 않습니다!',
          },
        ],
      },
      {
        type: 'act-header',
        actTitle: '패스트 캐스트 (FCR) 프레임',
      },
      {
        type: 'steps',
        steps: [
          {
            badge: '⚡', badgeColor: 'gold',
            tags: [{ label: 'FCR', type: 'stat' }],
            title: '악마술사 패캐 프레임 표',
            content:
              '15프레임 : 0% 이상\n14프레임 : 9% 이상\n13프레임 : 18% 이상\n12프레임 : 30% 이상\n11프레임 : 48% 이상\n10프레임 : 75% 이상 (가성비 구간)\n  9프레임 : 125% 이상 (종결 구간)',
            highlight: true,
          },
          {
            badge: '▸', badgeColor: 'echo',
            tags: [{ label: '팁', type: 'tip' }],
            title: '주요 구간',
            content:
              '75% — 가성비 구간. 영혼 방패(25-35%) + 잠행(25%) 등으로 도달 가능.\n125% — 종결 구간. 고급 장비 필요. 메아리 빌드에서 목표.',
          },
        ],
      },
    ],
  },
];
