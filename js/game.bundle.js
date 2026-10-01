// ===== runtime.js =====
const BUILD_REV=window.__BUILD_REV__||'asset-refresh-0918';

// ===== data.js =====
const SAVE_KEY='mathPetLife.save.v9';
const SAVE_VERSION=9;
const domains=['덧셈','뺄셈','곱셈','나눗셈','분수','소수','도형','그래프/자료','비율/비례','혼합계산'];
const difficulties={쉬움:1,보통:1.3,어려움:1.7,도전:2.2};
const stats=['attack','defense','hp','agility','intelligence','evolution'];
const statNames={attack:'공격',defense:'방어',hp:'체력',agility:'민첩',intelligence:'지능',evolution:'진화'};
const domainWeights={
 '덧셈':[2,.5,.5,.3,.3,.2],'뺄셈':[.4,2,.6,.5,.3,.2],'곱셈':[.8,.5,2,.3,.4,.2],'나눗셈':[.5,.3,.4,2,.7,.2],
 '분수':[.3,.7,.4,.4,1.7,.8],'소수':[.4,.3,.3,.8,1.8,.6],'도형':[.2,.5,.3,.4,.6,1.8],'그래프/자료':[.2,.4,.3,.7,2,.6],
 '비율/비례':[.5,.5,.5,.5,1,1.2],'혼합계산':[.8,.8,.8,.8,.8,.8]
};
const personalities=['용감함','신중함','장난꾸러기','냉정함','호기심 많음','다정함','독립적','반항적','성실함','겁많음','낙천적','경쟁적'];
const starters=[
 {id:'brave',name:'브레이즈',trait:'용기형',species:'화염견',primary:'용감함',secondary:'경쟁적',likes:['training','trophy'],skill:'화염 돌진',ult:'홍련연격',awakenUlt:'초신성 홍련연격'},
 {id:'wise',name:'루미',trait:'지혜형',species:'별여우',primary:'호기심 많음',secondary:'냉정함',likes:['bookshelf','telescope'],skill:'별빛 계산',ult:'성좌 해석',awakenUlt:'은하 성좌 해석'},
 {id:'active',name:'제피',trait:'활동형',species:'바람냥',primary:'장난꾸러기',secondary:'낙천적',likes:['trampoline','ball'],skill:'바람 발톱',ult:'질풍 난무',awakenUlt:'폭풍 질풍 난무'},
 {id:'kind',name:'모아',trait:'다정형',species:'구름토끼',primary:'다정함',secondary:'성실함',likes:['sofa','plant'],skill:'구름 방울',ult:'포근한 비',awakenUlt:'기적의 포근한 비'},
 {id:'free',name:'픽시',trait:'자유형',species:'환상도마뱀',primary:'독립적',secondary:'장난꾸러기',likes:['graffiti','music'],skill:'환영 꼬리',ult:'프리즘 트릭',awakenUlt:'무한 프리즘 트릭'},
 {id:'careful',name:'테라',trait:'신중형',species:'수호사슴',primary:'신중함',secondary:'겁많음',likes:['bed','bookshelf'],skill:'수호 뿔',ult:'대지 장벽',awakenUlt:'세계수 대지 장벽'}
];

const petSkillTrees={
 brave:[
  {id:'ember_dash',name:'불꽃 돌진',stage:1,power:1.18,kind:'damage',sfx:'skill_fire',fx:'fire',lines:['길을 열어볼게!','정면으로 간다!','불꽃, 따라와!']},
  {id:'flare_bite',name:'화염 송곳니',stage:2,power:1.42,kind:'burst',sfx:'skill_fire_heavy',fx:'fireBurst',lines:['이번엔 더 뜨겁게!','놓치지 않아!','한 번에 몰아붙인다!']},
  {id:'blaze_chain',name:'홍염 연쇄',stage:3,power:1.68,kind:'multi',sfx:'skill_combo',fx:'comboFire',lines:['연속으로 간다!','끝까지 밀어붙여!','홍염 연쇄!']}
 ],
 wise:[
  {id:'star_calc',name:'별빛 계산',stage:1,power:1.08,kind:'damage',sfx:'skill_magic',fx:'star',lines:['궤적 계산 완료.','별빛, 여기야.','답은 이미 보여.']},
  {id:'orbit_lock',name:'궤도 봉인',stage:2,power:.92,kind:'slow',sfx:'skill_magic',fx:'orbit',lines:['움직임을 묶을게.','속도를 읽었어.','궤도 고정.']},
  {id:'constellation_ray',name:'성좌 광선',stage:3,power:1.55,kind:'pierce',sfx:'skill_beam',fx:'beam',lines:['성좌를 연결한다.','빛의 선을 따라가.','계산 끝, 발사!']}
 ],
 active:[
  {id:'wind_claw',name:'바람 발톱',stage:1,power:1.10,kind:'damage',sfx:'skill_wind',fx:'wind',lines:['잡았다!','슝 하고 간다!','바람보다 빠르게!']},
  {id:'gale_step',name:'질풍 스텝',stage:2,power:.86,kind:'speed',sfx:'skill_wind',fx:'dash',lines:['못 따라오지?','한 바퀴 더!','속도 올린다!']},
  {id:'cyclone_rush',name:'회오리 난무',stage:3,power:1.48,kind:'multi',sfx:'skill_combo',fx:'cyclone',lines:['빙글빙글, 간다!','이번엔 연속이야!','회오리 난무!']}
 ],
 kind:[
  {id:'cloud_bubble',name:'구름 방울',stage:1,power:.78,kind:'healHit',sfx:'skill_heal',fx:'bubble',lines:['다치지 않게 갈게.','포근하게 감싸줄게.','구름 방울!']},
  {id:'soft_rain',name:'포근한 비',stage:2,power:.55,kind:'heal',sfx:'skill_heal',fx:'rainHeal',lines:['조금 쉬어도 괜찮아.','회복부터 하자.','포근한 비야, 내려와.']},
  {id:'cloud_burst',name:'솜구름 폭발',stage:3,power:1.38,kind:'burst',sfx:'skill_magic',fx:'cloudBurst',lines:['이번엔 내가 지킬게!','구름도 세게 칠 수 있어!','솜구름 폭발!']}
 ],
 free:[
  {id:'illusion_tail',name:'환영 꼬리',stage:1,power:1.04,kind:'trick',sfx:'skill_magic',fx:'prism',lines:['진짜는 어느 쪽일까?','찾아봐!','환영 꼬리!']},
  {id:'prism_shift',name:'프리즘 시프트',stage:2,power:.92,kind:'gauge',sfx:'skill_prism',fx:'prismShift',lines:['위치 바꾼다!','여기 아니지~','프리즘 시프트!']},
  {id:'mirror_break',name:'거울파편 연타',stage:3,power:1.52,kind:'multi',sfx:'skill_prism',fx:'shards',lines:['전부 가짜라고 생각했지?','한꺼번에 간다!','거울파편 연타!']}
 ],
 careful:[
  {id:'guardian_horn',name:'수호 뿔',stage:1,power:.88,kind:'guardHit',sfx:'skill_guard',fx:'earth',lines:['무리하지 말자.','막고 치면 돼.','수호 뿔!']},
  {id:'stone_bind',name:'대지 구속',stage:2,power:.84,kind:'slow',sfx:'skill_guard',fx:'bind',lines:['발부터 묶을게.','움직임을 줄이자.','대지 구속.']},
  {id:'forest_wall',name:'수호림 파동',stage:3,power:1.28,kind:'guardBurst',sfx:'skill_earth',fx:'forestWave',lines:['여기서 더 못 와.','이번엔 단단하게 간다.','수호림 파동!']}
 ]
};
function skillsFor(starterId,stage=1){return (petSkillTrees[starterId]||[]).filter(s=>s.stage<=stage);}

const tendencyQuestions=[
 {q:'새로운 길이 보이면?',a:[['일단 가본다','brave'],['주변부터 살핀다','careful'],['왜 생겼는지 궁금하다','wise']]},{q:'친구가 어려워하면?',a:[['먼저 도와준다','kind'],['같이 방법을 찾는다','wise'],['분위기를 웃게 만든다','active']]},{q:'쉬는 시간이 생기면?',a:[['몸을 움직인다','active'],['내 방식대로 논다','free'],['조용히 쉬거나 정리한다','careful']]},{q:'어려운 문제가 나오면?',a:[['끝까지 부딪혀 본다','brave'],['규칙을 찾아본다','wise'],['다른 방법부터 시험한다','free']]},{q:'처음 보는 물건이 있으면?',a:[['바로 만져본다','active'],['어떻게 작동하는지 본다','wise'],['위험한지 먼저 본다','careful']]},{q:'팀에서 나는?',a:[['앞에서 이끈다','brave'],['사이를 챙긴다','kind'],['아이디어를 낸다','free']]},{q:'실수했을 때?',a:[['다시 바로 도전한다','brave'],['원인을 분석한다','wise'],['기분을 털고 다른 방식으로 한다','active']]},{q:'방을 꾸민다면?',a:[['포근하게','kind'],['독특하게','free'],['정돈되고 편하게','careful']]},{q:'게임에서 더 끌리는 건?',a:[['강한 적과 승부','brave'],['전략 짜기','wise'],['빠르게 돌아다니기','active']]},{q:'친구와 의견이 다르면?',a:[['먼저 들어본다','kind'],['내 방식도 해본다','free'],['천천히 비교한다','careful']]}
];
const shops=[
 {id:'apple',name:'아삭 사과',category:'먹이',price:4,currency:'stars',kind:'food',foodStyle:'crunch',hunger:16,bond:.8,mood:2,desc:'저렴한 기본 과일. 포만도와 호감도를 조금 회복.'},
 {id:'banana',name:'달콤 바나나',category:'먹이',price:5,currency:'stars',kind:'food',foodStyle:'soft',hunger:20,mood:4,desc:'포만도가 좋은 일상식.'},
 {id:'milk',name:'따뜻한 우유',category:'먹이',price:6,currency:'stars',kind:'food',foodStyle:'sip',hunger:14,condition:8,fatigue:-5,stat:{defense:.06},desc:'포만도는 보통. 컨디션을 회복하고 방어 +6%가 20분 유지.'},
 {id:'nuts',name:'고소한 견과팩',category:'먹이',price:7,currency:'stars',kind:'food',foodStyle:'crunch',hunger:15,stat:{intelligence:.13},desc:'지능 +13%가 20분 유지되는 집중 간식.'},
 {id:'meat',name:'구운 단백질볼',category:'먹이',price:9,currency:'stars',kind:'food',foodStyle:'bite',hunger:25,condition:2,stat:{attack:.14},desc:'포만도가 높고 공격 +14%가 20분 유지.'},
 {id:'veggie_soup',name:'채소 수프',category:'먹이',price:8,currency:'stars',kind:'food',foodStyle:'sip',hunger:19,condition:10,fatigue:-4,desc:'컨디션 회복형 식사.'},
 {id:'grain_bowl',name:'곡물 한그릇',category:'먹이',price:8,currency:'stars',kind:'food',foodStyle:'bite',hunger:27,mood:1,desc:'가격 대비 포만도가 높은 든든한 식사.'},
 {id:'berry_yogurt',name:'베리 요거트',category:'먹이',price:10,currency:'stars',kind:'food',foodStyle:'soft',hunger:16,mood:10,bond:1.2,desc:'기분과 교감에 좋은 간식.'},
 {id:'energy_jelly',name:'에너지 젤리',category:'먹이',price:12,currency:'stars',kind:'food',foodStyle:'jelly',hunger:10,condition:12,fatigue:-9,stat:{agility:.12},desc:'포만도는 낮지만 피로 회복 + 민첩 +12%가 20분 유지.'},
 {id:'study_cookie',name:'집중 쿠키',category:'먹이',price:13,currency:'stars',kind:'food',foodStyle:'crunch',hunger:12,mood:3,stat:{intelligence:.20},condition:-2,desc:'지능 +20%가 20분 유지되는 대신 컨디션이 아주 조금 감소.'},
 {id:'power_steak',name:'파워 스테이크',category:'먹이',price:15,currency:'stars',kind:'food',foodStyle:'bite',hunger:32,stat:{attack:.26,agility:-.07},fatigue:3,desc:'20분간 공격 +26% / 민첩 -7%. 대신 피로가 조금 늘어난다.'},
 {id:'calm_tea',name:'달빛 허브티',category:'먹이',price:14,currency:'stars',kind:'food',foodStyle:'sip',hunger:6,mood:14,bond:1.8,fatigue:-10,desc:'포만도는 낮지만 기분·교감·휴식에 특화.'},
 {id:'special_snack',name:'별사탕 파르페',category:'먹이',price:20,currency:'stars',kind:'food',foodStyle:'special',hunger:18,mood:22,bond:2.2,condition:5,desc:'비싼 특별식. 기분과 교감이 크게 오른다.'},
 {id:'bed',name:'포근한 침대',category:'기능형',price:60,currency:'stars',kind:'furniture',actions:['잠자기','뒹굴기','점프'],desc:'침실 행동을 해금한다.'},{id:'bookshelf',name:'작은 책장',category:'기능형',price:72,currency:'stars',kind:'furniture',actions:['책 고르기','책 읽기'],desc:'독서 행동을 해금한다.'},{id:'sofa',name:'폭신 소파',category:'기능형',price:76,currency:'stars',kind:'furniture',actions:['소파 앉기','눕기'],desc:'휴식 행동을 해금한다.'},{id:'plant',name:'초록 화분',category:'꾸미기',price:34,currency:'stars',kind:'furniture',actions:['화분 보기','물주기'],desc:'방에 생기를 더한다.'},{id:'window',name:'아치형 창문',category:'꾸미기',price:88,currency:'stars',kind:'furniture',actions:['창밖 보기','햇빛 쬐기','바람 맞기'],desc:'창문과 햇살을 따로 배치할 수 있다.'},{id:'trampoline',name:'트램펄린',category:'기능형',price:90,currency:'stars',kind:'furniture',actions:['점프'],desc:'활동적인 행동을 해금한다.'},{id:'training',name:'훈련기구',category:'기능형',price:105,currency:'stars',kind:'furniture',actions:['운동','기록 확인'],desc:'훈련 행동을 해금한다.'},{id:'desk',name:'공부 책상',category:'기능형',price:82,currency:'stars',kind:'furniture',actions:['공부','낙서'],desc:'공부와 낙서를 한다.'},{id:'mirror',name:'전신 거울',category:'기능형',price:48,currency:'stars',kind:'furniture',actions:['포즈','머리 정리'],desc:'거울 앞에서 반응한다.'},{id:'fridge',name:'작은 냉장고',category:'기능형',price:115,currency:'stars',kind:'furniture',actions:['간식 찾기','몰래 먹기'],desc:'먹이 관련 연쇄 행동을 해금한다.'},{id:'console',name:'미니 게임기',category:'기능형',price:125,currency:'stars',kind:'furniture',actions:['게임하기'],desc:'혼자 또는 함께 노는 행동을 한다.'},
 {id:'lamp',name:'무드 램프',category:'꾸미기 가구',price:54,currency:'stars',kind:'furniture',actions:['램프 켜기','빛 구경'],desc:'밤 생활방 분위기를 바꾼다.'},{id:'toybox',name:'장난감 상자',category:'기능형',price:88,currency:'stars',kind:'furniture',actions:['장난감 고르기','놀기'],desc:'놀이 행동을 늘린다.'},{id:'easel',name:'그림 그리기 세트',category:'기능형',price:96,currency:'stars',kind:'furniture',actions:['그림 그리기','작품 보기'],desc:'창작 행동과 추억을 만든다.'},{id:'bath',name:'미니 욕조',category:'기능형',price:118,currency:'stars',kind:'furniture',actions:['목욕하기','물장난'],desc:'컨디션과 기분 회복 행동을 해금한다.'},{id:'music',name:'작은 오디오',category:'기능형',price:108,currency:'stars',kind:'furniture',actions:['음악 듣기','춤추기'],desc:'음악·춤 생활 행동을 해금한다.'},{id:'trophy',name:'트로피 진열장',category:'꾸미기 가구',price:142,currency:'stars',kind:'furniture',actions:['기록 보기','뿌듯해하기'],desc:'배틀 기록을 방에 전시한다.'},{id:'wardrobe',name:'작은 옷장',category:'기능형',price:110,currency:'stars',kind:'furniture',actions:['옷장 열기','옷 구경','문 닫기'],desc:'펫이 옷장을 열고 꾸미기에 반응한다.'},{id:'ball',name:'탱탱 공',category:'기능형',price:62,currency:'stars',kind:'furniture',actions:['공 튀기기','공 따라가기','공 멈추기'],desc:'공을 튀기고 따라다니며 노는 행동을 해금한다.'},
 {id:'domain_boost',name:'영역 숙련 부스트 1시간',category:'기간 부스트',price:42,currency:'stars',kind:'boost',boost:{type:'study',rate:.25,duration:3600000},desc:'학습 성장 +25%. 시간만 연장된다.'},{id:'offline_boost',name:'자동훈련 부스트 1시간',category:'기간 부스트',price:36,currency:'stars',kind:'boost',boost:{type:'offline',rate:.2,duration:3600000},desc:'오프라인 자동성장 효율 +20%. 전투력 직접 판매가 아니다.'},{id:'study_boost',name:'학습 부스트 30분',category:'기간 부스트',price:30,currency:'stars',kind:'boost',boost:{type:'study',rate:.2,duration:1800000},desc:'학습 경험치 +20%. 중첩 대신 시간 연장.'},{id:'wallpaper_night',name:'별밤 벽지',category:'꾸미기',price:78,currency:'stars',kind:'decor',slot:'wallpaper',desc:'방 배경을 별밤 테마로 바꾼다.'},{id:'aura_spark',name:'별빛 오라',category:'꾸미기',price:68,currency:'stars',kind:'decor',slot:'aura',desc:'생활/배틀 주변 장식 오라.'},{id:'footprint_leaf',name:'잎사귀 발자국',category:'꾸미기',price:52,currency:'stars',kind:'decor',slot:'footprint',desc:'이동할 때 보이는 장식 효과.'},{id:'victory_pose',name:'특별 승리 포즈',category:'꾸미기',price:88,currency:'stars',kind:'decor',slot:'victory',desc:'승리 연출 슬롯을 해금한다.'},{id:'nameplate',name:'반짝 이름표',category:'꾸미기',price:58,currency:'stars',kind:'decor',slot:'nameplate',desc:'이름표 장식을 해금한다.'},
 {id:'floor_cloud',name:'구름 바닥',category:'꾸미기',price:64,currency:'stars',kind:'decor',slot:'floor',desc:'생활방 바닥 테마를 바꾼다.'},{id:'floor_wood',name:'따뜻한 원목 바닥',category:'꾸미기',price:72,currency:'stars',kind:'decor',slot:'floor',desc:'생활방 바닥 테마를 바꾼다.'},{id:'window_moon',name:'달빛 창문',category:'꾸미기',price:84,currency:'stars',kind:'decor',slot:'window',desc:'방 창문 연출을 바꾼다.'},{id:'rug_star',name:'별무늬 러그',category:'꾸미기',price:46,currency:'stars',kind:'decor',slot:'rug',desc:'방 중앙 장식 러그.'},{id:'bubble_pixel',name:'픽셀 말풍선',category:'꾸미기',price:56,currency:'stars',kind:'decor',slot:'bubble',desc:'펫 대사 말풍선 테마.'},{id:'entrance_star',name:'별빛 출전 연출',category:'꾸미기',price:96,currency:'stars',kind:'decor',slot:'entrance',desc:'배틀/사냥 출전 장면을 꾸민다.'},{id:'hunt_trail',name:'사냥 별가루 흔적',category:'꾸미기',price:82,currency:'stars',kind:'decor',slot:'huntTrail',desc:'자동사냥 이동 흔적 장식.'},{id:'victory_confetti',name:'별가루 승리 연출',category:'꾸미기',price:104,currency:'stars',kind:'decor',slot:'victoryFx',desc:'배틀 승리 연출을 꾸민다.'},
 {id:'storage_1',name:'보관함 확장 I',category:'집 확장',price:70,currency:'stars',kind:'service',service:'storage',tier:1,desc:'자동사냥 인벤토리 상한을 40으로 늘린다.'},{id:'storage_2',name:'보관함 확장 II',category:'집 확장',price:130,currency:'stars',kind:'service',service:'storage',tier:2,desc:'자동사냥 인벤토리 상한을 55로 늘린다.'},{id:'furncap_1',name:'가구 배치 확장 I',category:'집 확장',price:85,currency:'stars',kind:'service',service:'furnitureCapacity',tier:1,desc:'방마다 가구 6개까지 배치한다.'},{id:'furncap_2',name:'가구 배치 확장 II',category:'집 확장',price:155,currency:'stars',kind:'service',service:'furnitureCapacity',tier:2,desc:'방마다 가구 최대 7개까지 배치한다.'},{id:'pet_slot_2',name:'펫 공간 확장 II',category:'집 확장',price:95,currency:'stars',kind:'service',service:'petSlot',tier:2,desc:'두 번째 펫 공간을 연다.'},{id:'pet_slot_3',name:'펫 공간 확장 III',category:'집 확장',price:145,currency:'stars',kind:'service',service:'petSlot',tier:3,desc:'세 번째 펫 공간을 연다.'},{id:'pet_slot_4',name:'펫 공간 확장 IV',category:'집 확장',price:200,currency:'stars',kind:'service',service:'petSlot',tier:4,desc:'네 번째 펫 공간을 연다.'},{id:'pet_slot_5',name:'펫 공간 확장 V',category:'집 확장',price:270,currency:'stars',kind:'service',service:'petSlot',tier:5,desc:'다섯 번째 펫 공간을 연다.'},{id:'pet_slot_6',name:'펫 공간 확장 VI',category:'집 확장',price:350,currency:'stars',kind:'service',service:'petSlot',tier:6,desc:'여섯 번째 펫 공간을 연다.'}
];


const rarityOrder=['common','uncommon','rare','epic','legendary'];
function shopRarity(it){
 if(!it)return 'common';
 if(it.rarity)return it.rarity;
 if(it.kind==='service') return it.price>=200?'epic':it.price>=100?'rare':'uncommon';
 if(it.kind==='decor') return it.price>=95?'rare':it.price>=60?'uncommon':'common';
 if(it.kind==='furniture') return it.price>=135?'epic':it.price>=90?'rare':it.price>=50?'uncommon':'common';
 if(it.kind==='boost') return 'rare';
 if(it.kind==='food') return it.price>=15?'rare':it.price>=8?'uncommon':'common';
 return 'common';
}
const effectNames={study:'학습 성장',recovery:'회복 효과',mood:'기분 회복',bond:'교감 효과',food:'먹이 효과',attack:'공격',defense:'방어',agility:'민첩',intelligence:'지능',battleGauge:'배틀 게이지',huntXp:'사냥 경험치',huntDrop:'전리품 발견',restEfficiency:'휴식 효율',runawayGuard:'가출 위험 감소',hungerDrain:'허기 소모',fatigueGain:'피로 누적',conditionDrain:'컨디션 소모'};
const passiveEffectCatalog={
 bed:{mode:'placed',mods:{recovery:.04,restEfficiency:.08},label:'휴식 회복 +4% · 피로 회복 +8%'},
 bookshelf:{mode:'placed',mods:{study:.018},label:'학습 성장 +1.8%'},
 sofa:{mode:'placed',mods:{recovery:.025,restEfficiency:.05},label:'생활 회복 +2.5% · 휴식 효율 +5%'},
 plant:{mode:'placed',mods:{mood:.025,runawayGuard:.03},label:'기분 회복 +2.5% · 가출 위험 -3%'},
 trampoline:{mode:'placed',mods:{agility:.015,fatigueGain:.025},label:'민첩 +1.5% · 피로 누적 +2.5%'},
 training:{mode:'placed',mods:{attack:.018,recovery:-.01},label:'공격 +1.8% · 회복 -1%'},
 desk:{mode:'placed',mods:{study:.015,mood:-.008},label:'학습 성장 +1.5% · 기분 회복 -0.8%'},
 mirror:{mode:'placed',mods:{bond:.012,mood:.008},label:'교감 +1.2% · 기분 회복 +0.8%'},
 fridge:{mode:'placed',mods:{food:.04,hungerDrain:-.03},label:'먹이 효과 +4% · 허기 소모 -3%'},
 console:{mode:'placed',mods:{battleGauge:.015,fatigueGain:.025},label:'배틀 게이지 +1.5% · 피로 누적 +2.5%'},
 lamp:{mode:'placed',mods:{mood:.02,restEfficiency:.025},label:'기분 회복 +2% · 휴식 효율 +2.5%'},
 toybox:{mode:'placed',mods:{bond:.016,mood:.012},label:'놀이 교감 +1.6% · 기분 회복 +1.2%'},
 easel:{mode:'placed',mods:{study:.012,bond:.008},label:'학습 성장 +1.2% · 교감 +0.8%'},
 bath:{mode:'placed',mods:{recovery:.05,conditionDrain:-.025},label:'컨디션 회복 +5% · 컨디션 소모 -2.5%'},
 music:{mode:'placed',mods:{mood:.03,bond:.008},label:'기분 회복 +3% · 교감 +0.8%'},
 trophy:{mode:'placed',mods:{battleGauge:.022,attack:.008},label:'배틀 게이지 +2.2% · 공격 +0.8%'},
 wardrobe:{mode:'placed',mods:{mood:.012,bond:.006},label:'기분 효율 +1.2% · 교감 +0.6%'},
 ball:{mode:'placed',mods:{mood:.014,agility:.006},label:'기분 효율 +1.4% · 민첩 +0.6%'},
 forest_fiber:{mode:'owned',mods:{huntXp:.004},label:'보유 효과 · 사냥 경험치 +0.4%'},
 ruin_token:{mode:'owned',mods:{runawayGuard:.04},label:'보유 효과 · 가출 위험 -4%'},
 lab_core:{mode:'owned',mods:{huntXp:.006,conditionDrain:.01},label:'보유 효과 · 사냥 경험치 +0.6% · 컨디션 소모 +1%'},
 deep_shard:{mode:'owned',mods:{huntDrop:.008},label:'보유 효과 · 전리품 발견 +0.8%'},
 furniture_piece:{mode:'none',mods:{},label:'가구 제작 재료'},rare_decor:{mode:'owned',mods:{mood:.006},label:'보유 효과 · 생활 기분효율 +0.6%'},
 cave_crystal:{mode:'equipped',slot:'accessory',mods:{defense:.05,agility:-.025},label:'장착 · 방어 +5% / 민첩 -2.5%'},
 wandering_charm:{mode:'equipped',slot:'charm',mods:{huntDrop:.035,runawayGuard:.10,fatigueGain:.04},label:'장착 · 드랍 +3.5% · 가출위험 -10% / 피로 +4%'},
 iron_band:{mode:'equipped',slot:'accessory',mods:{attack:.08,agility:-.05},label:'장착 · 공격 +8% / 민첩 -5%'},
 rest_charm:{mode:'equipped',slot:'charm',mods:{recovery:.08,restEfficiency:.14,attack:-.025},label:'장착 · 휴식 +14% · 회복 +8% / 공격 -2.5%'},
 sage_lens:{mode:'equipped',slot:'accessory',mods:{intelligence:.10,defense:-.04},label:'장착 · 지능 +10% / 방어 -4%'},
 home_bell:{mode:'equipped',slot:'relic',mods:{runawayGuard:.24,bond:.025,huntXp:-.025},label:'장착 · 가출위험 -24% · 교감 +2.5% / 사냥XP -2.5%'},
 lucky_feather:{mode:'equipped',slot:'relic',mods:{huntDrop:.045,defense:-.045},label:'장착 · 드랍 +4.5% / 방어 -4.5%'},
 ember_core:{mode:'equipped',slot:'relic',mods:{attack:.06,battleGauge:.035,recovery:-.05},label:'장착 · 공격 +6% · 게이지 +3.5% / 회복 -5%'}
};

const rarityMeta={
 common:{name:'일반',rank:0,sfx:'loot_common',fx:'loot-common'},
 uncommon:{name:'고급',rank:1,sfx:'loot_uncommon',fx:'loot-uncommon'},
 rare:{name:'희귀',rank:2,sfx:'loot_rare',fx:'loot-rare'},
 epic:{name:'영웅',rank:3,sfx:'loot_epic',fx:'loot-epic'},
 legendary:{name:'전설',rank:4,sfx:'loot_legendary',fx:'loot-legendary'}
};
const itemCatalog={
 material:{id:'material',name:'잡동사니 재료',rarity:'common',baseValue:5,source:'hunt',desc:'자동사냥에서 얻는 기본 제작 재료.'},
 forest_fiber:{id:'forest_fiber',name:'숲빛 섬유',rarity:'uncommon',baseValue:10,source:'hunt',zone:'forest',desc:'숲 자동사냥 전용 재료. 보유 시 아주 작은 사냥 성장 보너스.'},
 cave_crystal:{id:'cave_crystal',name:'미광 수정',rarity:'uncommon',baseValue:12,source:'hunt',zone:'cave',equipSlot:'accessory',desc:'장착형. 방어를 올리지만 민첩이 조금 감소한다.'},
 ruin_token:{id:'ruin_token',name:'낡은 문양 조각',rarity:'rare',baseValue:25,source:'hunt',zone:'ruin',desc:'보유만 해도 펫이 집을 떠날 위험을 아주 조금 낮춘다.'},
 lab_core:{id:'lab_core',name:'소형 코어',rarity:'rare',baseValue:25,source:'hunt',zone:'lab',desc:'사냥 성장에 도움을 주지만 컨디션 소모가 약간 늘어난다.'},
 iron_band:{id:'iron_band',name:'무쇠 결속띠',rarity:'rare',baseValue:34,source:'hunt',zone:'cave',equipSlot:'accessory',desc:'장착형. 공격을 크게 올리는 대신 민첩을 낮춘다.'},
 rest_charm:{id:'rest_charm',name:'포근잠 부적',rarity:'rare',baseValue:36,source:'hunt',zone:'forest',equipSlot:'charm',desc:'장착형. 휴식과 회복을 크게 돕지만 공격이 조금 낮아진다.'},
 deep_shard:{id:'deep_shard',name:'심층 별결정',rarity:'epic',baseValue:60,source:'hunt',zone:'deep',desc:'보유 시 전리품 발견률을 아주 조금 높이는 심층 수집품.'},
 sage_lens:{id:'sage_lens',name:'현자의 렌즈',rarity:'epic',baseValue:78,source:'hunt',zone:'lab',equipSlot:'accessory',desc:'장착형. 지능을 크게 올리지만 방어가 낮아진다.'},
 home_bell:{id:'home_bell',name:'귀가의 방울',rarity:'epic',baseValue:82,source:'hunt',zone:'ruin',equipSlot:'relic',desc:'장착형. 가출 위험을 크게 낮추지만 사냥 경험치 효율이 조금 감소한다.'},
 lucky_feather:{id:'lucky_feather',name:'행운깃 유물',rarity:'epic',baseValue:88,source:'hunt',zone:'deep',equipSlot:'relic',desc:'장착형. 전리품 발견률을 높이는 대신 방어가 낮아진다.'},
 wandering_charm:{id:'wandering_charm',name:'방랑자의 부적',rarity:'legendary',baseValue:140,source:'hunt',zone:'deep',equipSlot:'charm',desc:'장착형 극희귀품. 드랍과 가출 안정성을 높이지만 장시간 사냥 피로가 늘어난다.'},
 ember_core:{id:'ember_core',name:'홍염 코어',rarity:'legendary',baseValue:155,source:'hunt',zone:'deep',equipSlot:'relic',desc:'장착형 극희귀품. 공격과 배틀 게이지를 크게 높이지만 회복 효율을 낮춘다.'},
 furniture_piece:{id:'furniture_piece',name:'가구 조각',rarity:'uncommon',baseValue:10,source:'hunt',desc:'가구 제작에 쓰는 조각.'},
 rare_decor:{id:'rare_decor',name:'희귀 장식 조각',rarity:'rare',baseValue:25,source:'hunt',desc:'자동사냥에서 낮은 확률로 얻는 장식 재료.'}
};

const furnitureChains={bed:['침대에 올라가기','이불 파고들기','잠자기','기지개 켜기'],fridge:['문 열기','간식 찾기','냄새 맡기','문 닫기'],bookshelf:['책 고르기','책 펼치기','책 읽기','꾸벅꾸벅'],console:['게임 켜기','집중하기','승리 포즈'],plant:['화분 보기','물주기','새잎 확인'],window:['창문 닦기','창밖 보기','햇빛 쬐기','바람 맞기'],training:['기구 살펴보기','운동하기','숨 고르기'],wardrobe:['옷장 열기','옷 구경하기','마음에 드는 옷 고르기','문 닫기'],ball:['공 튀기기','공 따라가기','한 번 더 튀기기','공 멈추기'],bath:['물 확인하기','목욕하기','물 털기'],music:['음악 켜기','리듬 타기','춤추기'],mirror:['거울 보기','포즈 잡기','머리 정리하기']};
const zones=[
 {id:'yard',name:'동네 공터',need:1,reward:1,danger:1,desc:'초급 · 일반 재료',weather:['맑음','구름'],objects:['벤치','표지판','풀숲']},{id:'forest',name:'숲',need:4,reward:1.25,danger:2,desc:'식물 재료 · 숨은 오브젝트',weather:['맑음','비','안개'],objects:['나무','버섯','수상한 덤불']},{id:'cave',name:'동굴',need:7,reward:1.5,danger:3,desc:'광물 · 방어/체력 중요',weather:['서늘함','물방울'],objects:['수정','바위','광맥']},{id:'ruin',name:'폐허',need:10,reward:1.8,danger:4,desc:'희귀 장식 재료',weather:['바람','흐림','비'],objects:['깨진 기둥','상자','낡은 표지']},{id:'lab',name:'연구구역',need:14,reward:2.2,danger:5,desc:'기계 재료 · 지능형 몬스터',weather:['실내','경고등'],objects:['단말기','기계상자','센서']},{id:'deep',name:'심층지역',need:18,reward:2.8,danger:6,desc:'고레벨 · 희귀 드롭',weather:['어둠','별빛','안개'],objects:['고대석','빛나는 틈','봉인문']}
];
const zoneEnemyMap={yard:['spar','green_slime','mushroom'],forest:['mushroom','fox','leafling'],cave:['golem','shellbug','shadowbat'],ruin:['scarab','shadowbat','fox'],lab:['drone','firemage','shellbug'],deep:['minotaur','firemage','drone']};
const zoneLootMap={yard:['material','furniture_piece','rare_decor'],forest:['material','forest_fiber','rest_charm'],cave:['material','cave_crystal','iron_band'],ruin:['material','furniture_piece','ruin_token','home_bell'],lab:['material','furniture_piece','lab_core','sage_lens'],deep:['material','furniture_piece','rare_decor','deep_shard','lucky_feather','wandering_charm','ember_core']};
const huntEnemies=[
 {id:'spar',name:'파란 슬라임',type:'balanced',hp:30,atk:6,def:2,speed:5,role:'swarm'},
 {id:'green_slime',name:'녹색 슬라임',type:'balanced',hp:36,atk:7,def:4,speed:4,role:'swarm'},
 {id:'mushroom',name:'버섯 몬스터',type:'smart',hp:38,atk:7,def:3,speed:4,role:'caster'},
 {id:'fox',name:'숲여우',type:'speed',hp:34,atk:7,def:3,speed:8,role:'skirmish'},
 {id:'golem',name:'바위 골렘',type:'guard',hp:52,atk:9,def:7,speed:3,role:'tank'},
 {id:'shadowbat',name:'그림자 박쥐',type:'speed',hp:42,atk:9,def:3,speed:10,role:'skirmish'},
 {id:'scarab',name:'붉은 갑각충',type:'burst',hp:48,atk:11,def:5,speed:6,role:'charger'},
 {id:'shellbug',name:'가시 등껍질',type:'guard',hp:58,atk:9,def:9,speed:3,role:'tank'},
 {id:'firemage',name:'불꽃 마법사',type:'smart',hp:44,atk:12,def:3,speed:6,role:'caster'},
 {id:'minotaur',name:'미노타우르스',type:'burst',hp:66,atk:14,def:8,speed:4,role:'bruiser'},
 {id:'leafling',name:'잎정령',type:'balanced',hp:46,atk:8,def:5,speed:7,role:'support'},
 {id:'drone',name:'로봇 드론',type:'smart',hp:50,atk:10,def:6,speed:7,role:'ranged'}
];
const battleEnemies=[
 {id:'spar',name:'파란 슬라임',type:'balanced',bias:{attack:4,guard:2,skill:2}},
 {id:'green_slime',name:'녹색 슬라임',type:'balanced',bias:{attack:4,guard:3,skill:1}},
 {id:'mushroom',name:'버섯 몬스터',type:'smart',bias:{attack:2,guard:2,skill:5}},
 {id:'fox',name:'숲여우',type:'speed',bias:{attack:3,guard:1,skill:5}},
 {id:'golem',name:'바위 골렘',type:'guard',bias:{attack:3,guard:4,skill:2}},
 {id:'shadowbat',name:'그림자 박쥐',type:'speed',bias:{attack:4,guard:1,skill:5},minLevel:4},
 {id:'scarab',name:'붉은 갑각충',type:'burst',bias:{attack:5,guard:2,skill:3},minLevel:5},
 {id:'shellbug',name:'가시 등껍질',type:'guard',bias:{attack:2,guard:6,skill:2},minLevel:6},
 {id:'firemage',name:'불꽃 마법사',type:'smart',bias:{attack:2,guard:1,skill:7},minLevel:8},
 {id:'minotaur',name:'미노타우르스',type:'burst',bias:{attack:6,guard:2,skill:3},minLevel:10},
 {id:'leafling',name:'잎정령',type:'balanced',bias:{attack:3,guard:2,skill:5},minLevel:7},
 {id:'drone',name:'로봇 드론',type:'smart',bias:{attack:3,guard:2,skill:6},minLevel:9}
];
const explorationRoutes=[{id:'walk',name:'동네 산책',need:1,minutes:3,reward:1,desc:'3분 동안 함께 걷고 친구와 소소한 일을 만난다.'}];
const dialoguePools={
 neutral:['오늘은 뭐 할까?','여기 있으면 마음이 편해.','아까 하던 것도 다시 해보고 싶어.','잠깐 같이 있어 줄래?'],
 hungry:['배에서 꼬르륵 소리 났어.','간식 생각이 자꾸 나.','먹고 나면 더 잘할 수 있을 것 같아.'], tired:['조금 쉬었다 하면 안 될까?','눈이 자꾸 감겨.','오늘은 천천히 해도 괜찮지?'], happy:['오늘 왠지 잘될 것 같아!','기분 좋아. 뭐든 해보자!','방금 그거 꽤 멋졌지?'], lowBond:['요즘은 혼자 있는 게 더 편할 때도 있어.','나한테 조금만 더 신경 써주면 좋겠어.'],
 studyCorrect:['봤지? 나도 같이 집중했어!','정답이다! 다음 것도 해보자.','좋아, 감 잡았어.'], studyWrong:['괜찮아. 다음 문제에서 다시 맞히자.','이건 헷갈릴 만했어. 한번 더 보면 돼.'], streak:['연속으로 맞히고 있어!','지금 완전 집중 모드야!'], rare:['저거 반짝인다! 진짜 희귀한 거 아냐?','우와, 이건 꼭 챙기자!'], win:['우리 호흡 좋았어!','다음 상대도 해볼까?'], loss:['다음에는 흐름을 바꿔보자.','졌지만 뭘 고쳐야 할지는 알겠어.'], return:['왔어? 오늘은 오래 같이 있자.','다시 보니까 반갑다.'], adolescence:['왜 꼭 지금 해야 해?','나도 내 방식대로 해보고 싶어.','잠깐 혼자 생각하고 올게.']
};
const personalityLines={
 '용감함':['강한 상대면 더 재밌지!','겁먹을 시간에 한 번 더 해보자.','먼저 가볼게. 뒤따라와!'], '신중함':['조금만 더 보고 움직이자.','급하게 할 필요는 없어.','위험한 길은 표시해 둘게.'], '장난꾸러기':['저거 한 번 건드려 볼까?','헤헤, 방금 깜짝 놀랐지?','재밌는 거 없나~'], '냉정함':['지금은 침착하게 가는 게 좋아.','흐름만 보면 답이 보여.','다음 행동은 이미 정했어.'], '호기심 많음':['저건 왜 저렇게 생겼지?','새로운 건 그냥 지나칠 수 없지.','안쪽에 뭔가 더 있을 것 같아.'], '다정함':['오늘 네 기분은 어때?','같이 하면 더 좋잖아.','힘들면 잠깐 쉬어도 돼.'], '독립적':['나 혼자서도 한번 해볼게.','도와달라고 할 때 도와줘.','내 방식대로 해보고 싶어.'], '반항적':['음… 꼭 그래야 해?','오늘은 내가 정하면 안 돼?','시키는 대로만 하긴 싫은데.'], '성실함':['조금씩 해도 꾸준히 하면 돼.','오늘 할 건 오늘 해두자.','한 번 더 연습하고 쉬자.'], '겁많음':['저쪽… 괜찮은 거 맞지?','너도 같이 와주면 갈 수 있어.','놀라긴 했지만 도망가진 않을 거야.'], '낙천적':['뭐, 다음엔 되겠지!','재밌으면 된 거 아냐?','오늘은 좋은 일이 생길 것 같아.'], '경쟁적':['이번엔 꼭 내가 더 잘할 거야.','기록 조금만 더 줄여보자!','상대가 강할수록 해볼 맛 나지.']
};
const roomDefinitions=[{id:'living',name:'거실',price:0,desc:'기본 생활 공간'},{id:'bedroom',name:'침실',price:95,desc:'휴식 가구 중심 공간'},{id:'study',name:'공부방',price:120,desc:'책장과 공부 가구 중심'},{id:'training',name:'훈련실',price:145,desc:'운동·훈련 가구 중심'},{id:'garden',name:'정원',price:165,desc:'화분과 야외 휴식 공간'},{id:'research',name:'연구실',price:210,desc:'지능형 가구와 관찰 공간'},{id:'playground',name:'놀이터',price:185,desc:'놀이 가구 중심'},{id:'battle_room',name:'배틀룸',price:240,desc:'전투 기록을 전시하는 공간'}];
const leagueCups=[{id:'rookie',name:'저레벨컵',min:1,max:8,desc:'초기 성장 펫 대회'},{id:'growth',name:'성장기컵',stage:2,desc:'2단계 성장기 펫 대회'},{id:'final',name:'3단계컵',stage:3,desc:'3단계 완성형 대회'},{id:'speed',name:'속도 특화컵',stat:'agility',need:16,desc:'민첩 중심 대회'},{id:'balance',name:'균형 육성컵',balance:true,desc:'능력치 균형 중심 대회'}];
const offlineFacilities=[{id:'mixed',name:'기본 훈련장',domain:'혼합계산',stat:null,desc:'전체 성장 아주 소량'},{id:'add',name:'덧셈 훈련장',domain:'덧셈',stat:'attack',desc:'공격 성장 보조'},{id:'guard',name:'방어 훈련장',domain:'도형',stat:'defense',desc:'방어 성장 보조'},{id:'agile',name:'민첩 훈련장',domain:'소수',stat:'agility',desc:'민첩 성장 보조'},{id:'geometry',name:'도형 연구실',domain:'도형',stat:'intelligence',desc:'지능 성장 보조'},{id:'rest',name:'휴식실',domain:null,stat:null,desc:'경험치 대신 컨디션 회복'}];
const titleRules=[
 ['힘이 넘치는',p=>p.attack>=16],['파괴적인',p=>p.attack>=22],['한 방을 노리는',p=>p.attack>=28],['맹렬한',p=>p.attack>=34],['싸움에 눈뜬',p=>p.attack>=40],['철벽의',p=>p.defense>=16],['끈질긴',p=>p.hp>=34],['불굴의',p=>p.defense>=25&&p.hp>=42],['인내하는',p=>p.battles>=15],['수호자의',p=>p.defense>=32],['누구보다 빠른',p=>p.agility>=16],['번개 같은',p=>p.agility>=22],['바람을 가르는',p=>p.agility>=28],['재빠른',p=>p.agility>=34],['기습에 능한',p=>p.agility>=40],['전략적인',p=>p.intelligence>=16],['계산적인',p=>p.intelligence>=22],['냉정한',p=>p.intelligence>=28],['천재적인',p=>p.intelligence>=34],['꾀가 많은',p=>p.intelligence>=40],['진화에 가까운',p=>p.evolution>=16],['진화를 깨우친',p=>p.evolution>=24],['한계를 넘은',p=>p.evolution>=32],['각성한',p=>p.firstAwaken>0],['가능성이 넘치는',p=>p.evolution>=40],['균형 잡힌',p=>p.level>=8&&Math.max(p.attack,p.defense,p.hp/2,p.agility,p.intelligence)-Math.min(p.attack,p.defense,p.hp/2,p.agility,p.intelligence)<=5],['올라운더',p=>p.level>=12&&p.attack>=14&&p.defense>=14&&p.agility>=14&&p.intelligence>=14],['완벽을 노리는',p=>p.level>=20],['꾸준한',p=>p.totalQuestions>=120],['노력하는',p=>p.totalQuestions>=60],['포기하지 않는',p=>p.totalQuestions>=80],['집중하는',p=>p.bestStreak>=10],['침착한',p=>p.bestStreak>=15],['수학을 사랑하는',p=>p.totalQuestions>=250],['복습의 달인',p=>Object.values(p.mastery).reduce((s,m)=>s+(m.wrongReview||0),0)>=20],['덧셈의 달인',p=>p.mastery['덧셈'].level>=5],['뺄셈의 달인',p=>p.mastery['뺄셈'].level>=5],['곱셈의 달인',p=>p.mastery['곱셈'].level>=5],['나눗셈의 달인',p=>p.mastery['나눗셈'].level>=5],['도형을 꿰뚫는',p=>p.mastery['도형'].level>=5],['자료를 읽는',p=>p.mastery['그래프/자료'].level>=5],['비율을 이해한',p=>p.mastery['비율/비례'].level>=5],['분수에 강한',p=>p.mastery['분수'].level>=5],['역전의 명수',p=>p.wins>=10&&p.bestWinStreak>=3],['승부사',p=>p.bestWinStreak>=5],['강자를 사냥하는',p=>p.wins>=20],['무패의',p=>p.battles>=10&&p.wins===p.battles],['베테랑',p=>p.battles>=30],['필살기의 달인',p=>p.ultUses>=20],['사랑받는',p=>p.bond>=85],['최고의 파트너',p=>p.bond>=95&&p.level>=15],['섬광의 사냥꾼',p=>p.titles.includes('누구보다 빠른')&&p.titles.includes('기습에 능한')],['불굴의 수호자',p=>p.titles.includes('철벽의')&&p.titles.includes('끈질긴')],['전장을 읽는 자',p=>p.titles.includes('전략적인')&&p.titles.includes('역전의 명수')],['기적을 부르는 동료',p=>p.titles.includes('진화를 깨우친')&&p.titles.includes('최고의 파트너')],['사냥터의 단골',p=>p.huntKills>=80],['희귀품 수집가',p=>p.rareFinds>=8],['탐험가',p=>p.explorationCount>=12],['가구 애호가',p=>p.furnitureUses>=30],['다시 만난 친구',p=>p.returns>=1]
];
const gradeTable=[['마스터',1800],['플래티넘',1300],['골드',850],['실버',500],['브론즈',220],['새싹',0]];
const petGradeTable=[['SS',1500],['S',1100],['A',700],['B',350],['C',0]];
function currentSeason(){const m=new Date().getMonth()+1;if(m>=3&&m<=5)return {id:'spring',name:'봄',bonus:'탐험 재료 발견 +5%',decor:'벚꽃 이름표',title:'봄바람 친구'};if(m>=6&&m<=8)return {id:'summer',name:'여름',bonus:'자동사냥 희귀 발견 보정',decor:'파도 말풍선',title:'여름 탐험대'};if(m>=9&&m<=11)return {id:'autumn',name:'가을',bonus:'학습 별 진행도 +10%',decor:'단풍 이름표',title:'가을의 학습가'};return {id:'winter',name:'겨울',bonus:'생활 컨디션 감소 10% 완화',decor:'눈꽃 말풍선',title:'겨울의 동료'};}

// ===== assets.js =====
const cache=new Map();
let manifest={pets:{},monsters:{},rooms:{},furniture:{},hunt:{},objects:{},items:{},battle:{},fx:{},sfx:{},music:{}};
manifest={...manifest,...(window.__ASSET_MANIFEST__||{})};
function assetPath(kind,id){return manifest?.[kind]?.[id]||'';}
const sharedAtlasLoads=new Map();
function getAsset(kind,id){const src=assetPath(kind,id);if(!src)return null;const key=kind+':'+id+':'+src;if(!cache.has(key)){const region=window.__ASSET_REGIONS__?.[kind+':'+id];const notify=()=>window.dispatchEvent(new CustomEvent('mathpet:asset-ready',{detail:{kind,id}}));if(region){const c=document.createElement('canvas');c.width=region.w;c.height=region.h;c.complete=false;c.naturalWidth=0;c.naturalHeight=0;if(!sharedAtlasLoads.has(src))sharedAtlasLoads.set(src,new Promise((resolve,reject)=>{const atlas=new Image();atlas.onload=()=>resolve(atlas);atlas.onerror=reject;atlas.src=src+'?rev='+encodeURIComponent(BUILD_REV);}));const ready=sharedAtlasLoads.get(src).then(atlas=>{c.getContext('2d').drawImage(atlas,region.x,region.y,region.w,region.h,0,0,region.w,region.h);c.naturalWidth=region.w;c.naturalHeight=region.h;c.complete=true;notify();});ready.catch(()=>{});c.decode=()=>ready;cache.set(key,c);}else{const img=new Image();img.decoding='async';img.onload=notify;img.src=src+(src.includes('?')?'&':'?')+'rev='+encodeURIComponent(BUILD_REV);cache.set(key,img);}}return cache.get(key);}
function drawAsset(ctx,kind,id,x,y,w,h,opts={}){const img=getAsset(kind,id);if(!img||!img.complete||!img.naturalWidth)return false;ctx.save();if(opts.alpha!=null)ctx.globalAlpha=opts.alpha;if(opts.flipX){ctx.translate(x+w,y);ctx.scale(-1,1);ctx.drawImage(img,0,0,w,h);}else ctx.drawImage(img,x,y,w,h);ctx.restore();return true;}
function drawAssetCentered(ctx,kind,id,cx,cy,w,h,opts={}){return drawAsset(ctx,kind,id,cx-w/2,cy-h/2,w,h,opts);}
function drawFxAsset(ctx,id,frame,cx,cy,size){const img=getAsset('fx',id);if(!img||!img.complete||!img.naturalWidth)return false;const frames=img.naturalWidth>=img.naturalHeight*3.6?4:1,sw=img.naturalWidth/frames,sh=img.naturalHeight,sx=(frame%frames)*sw;ctx.drawImage(img,sx,0,sw,sh,cx-size/2,cy-size/2,size,size);return true;}
function petAssetMeta(starter,stage){const safe=Math.max(1,Math.min(4,Number(stage)||1));const key=`${starter}_${safe}`;const meta=window.__PET_ASSET_META__?.[key]||null;return {id:key,path:assetPath('pets',key),stage:safe,...(meta||{})};}
function resolvePetAsset(starter,stage){const wanted=Math.max(1,Math.min(4,Number(stage)||1));for(let s=wanted;s>=1;s--){const m=petAssetMeta(starter,s);if(m.path&&m.production)return {...m,requestedStage:wanted,fallbackStage:s===wanted?null:s};}const first=petAssetMeta(starter,1);return {...first,requestedStage:wanted,fallbackStage:wanted===1?null:1};}
function itemIconPath(id){return assetPath('items',id);}

function audioAssetPath(kind,id){return assetPath(kind,id);}

// ===== store.js =====
const now=()=>Date.now();
const mastery=()=>Object.fromEntries(domains.map(d=>[d,{level:1,xp:0,count:0,correct:0,wrongReview:0,recentTypes:[]}]))
function createPet(starterId,name){const s=starters.find(x=>x.id===starterId)||starters[0];return {
 id:crypto.randomUUID?.()||`pet-${now()}-${Math.random()}`,starter:s.id,species:s.species,name:name||s.name,bornAt:now(),stage:1,evolutionForm:'normal',level:1,exp:0,
 attack:8,defense:8,hp:24,agility:8,intelligence:8,evolution:6,bond:55,morality:60,hunger:85,condition:90,mood:85,fatigue:8,
 primary:s.primary,secondary:s.secondary,personalityXP:{[s.primary]:6,[s.secondary]:3},adolescence:false,adolescenceSeen:false,temporaryRegression:false,
 mastery:mastery(),totalQuestions:0,correct:0,studyStreak:0,bestStreak:0,battles:0,wins:0,winStreak:0,bestWinStreak:0,ultUses:0,
 firstEvolution:0,firstAwaken:0,runaways:0,returns:0,huntKills:0,rareFinds:0,explorationCount:0,furnitureUses:0,growthPath:[1],titles:[],titleHistory:[],representativeTitle:'',favoriteFurniture:'',actionCounts:{},memories:[],diary:[],relationships:{},lastAction:'',lastActionAt:0,absenceDays:0,conflictCount:0,goodCareCount:0,parting:null,roomMess:0,lastDialogueAt:0,lastDiaryDate:'',nextMischiefAt:0,lastFood:null,foodBuffs:[],roomAction:null,lastEvolutionEvent:null
};}
function createState(){return {
 version:SAVE_VERSION,createdAt:now(),updatedAt:now(),lastSeen:now(),onboarding:{done:false,phase:'egg',eggTaps:0,resolvedStarter:null,introRevision:4,careTotal:0,careGoal:6+Math.floor(Math.random()*3),careScores:{brave:0,wise:0,active:0,kind:0,free:0,careful:0},careCounts:{},careRecent:[],careMessage:'아직 어떤 아이가 될지는 아무도 몰라.'},stars:10,economy:{studyProgress:0,huntProgress:0,totalEarned:0,totalSpent:0,totalSold:0},pets:[],mainPetId:null,offlineFacility:'mixed',inventory:{apple:1,material:0,furniture_piece:0},furnitureOwned:[],furniturePlaced:[],decor:{wallpaper:'default',nameplate:'default'},equipment:{charm:null,accessory:null,relic:null},boosts:{},rooms:['living'],currentRoom:'living',home:{petSlots:1,storageTier:0,furnitureCapacity:4,maxFurniturePerRoom:7},shop:{dailySeed:new Date().toDateString(),recommendations:[]},codex:{species:[],stages:[],zones:[],exploration:[],titles:[],evolutions:[],awaken:false,furniture:[],skills:[],ultimates:[],memories:[],personalities:[],decor:[]},
 hunt:{running:false,zone:'yard',hp:100,kills:0,stars:0,items:0,rare:0,spent:0,upkeepPaid:0,startedAt:0,nextUpkeepAt:0,event:'idle',lastLoot:null,weather:'맑음',timeOfDay:'낮',field:{pet:{x:.18,y:.68,state:'idle',dir:1},enemy:null,drop:null,object:null,target:null,phaseTicks:0},settings:{hpReturn:20,hungerReturn:12,conditionReturn:12,maxMinutes:30,targetItems:0,maxInventory:30,targetEnemy:'auto',minimalUI:false}},
 exploration:{active:null,completed:[]},battle:{running:false,enemyLevel:1,enemyId:'spar',enemyName:'파란 슬라임',enemyType:'balanced',enemyHp:0,enemyMax:0,myHp:0,myMax:0,myGauge:0,enemyGauge:0,ult:0,awaken:0,awakened:false,awakenTurns:0,tempEvolution:null,tempEvolvedOnce:false,tempEvolutionFxUntil:0,streak:0,startedAt:0,lastQuizAt:0,score:0,enemyGuard:0,myGuard:0,status:{},enemyStatus:{},turn:0,logs:[],awakenFxUntil:0},daily:{date:new Date().toDateString(),study:0,feed:0,play:0,train:0,battle:0,review:0,praise:0,studyStars:0,huntStars:0,battleStars:0,exploreStars:0,leagueStars:0},settings:{quality:'auto',music:true,sfx:true,haptics:true,motion:true},ui:{tab:'home'},globalMemories:[],seasonClaim:'',seasonPurchases:[],leagueWeek:'',relationshipMemories:[],codexRewards:[],weeklyLeague:{week:'',plays:0,wins:0,bestScore:0},seasonShopBought:{}
};}

function normalizePet(p){
 if(!p||typeof p!=='object')return p;
 p.growthPath=Array.isArray(p.growthPath)?p.growthPath:[];
 p.growthPath=p.growthPath.map((v,i)=>{const text=String(v);if(/^(2|3):undefined$/.test(text))return `${text[0]}:normal`;return v;});
 if(p.lastEvolutionEvent&&typeof p.lastEvolutionEvent==='object'){
  const ev=p.lastEvolutionEvent;
  if(!Number.isFinite(Number(ev.fromStage)))ev.fromStage=Math.max(0,Number(ev.stage||1)-1);
  if(!ev.form||ev.form==='undefined')ev.form=Number(ev.stage)===3?(p.evolutionForm||'normal'):'normal';
 }
 p.adolescence=Boolean(p.adolescence&&Number(p.stage)===2);
 p.adolescenceSeen=Boolean(p.adolescenceSeen);
 p.evolutionForm=p.evolutionForm&&p.evolutionForm!=='undefined'?p.evolutionForm:'normal';
 return p;
}
function normalizeState(state){
 state.pets=Array.isArray(state.pets)?state.pets.map(normalizePet):[];
 state.ui=state.ui&&typeof state.ui==='object'?state.ui:{tab:'home'};
 state.codex=state.codex&&typeof state.codex==='object'?state.codex:{};
 for(const k of ['species','stages','zones','exploration','titles','evolutions','furniture','skills','ultimates','memories','personalities','decor'])if(!Array.isArray(state.codex[k]))state.codex[k]=[];
 state.codex.awaken=Boolean(state.codex.awaken);
 state.furniturePlaced=Array.isArray(state.furniturePlaced)?state.furniturePlaced:[];
 state.furnitureOwned=Array.isArray(state.furnitureOwned)?state.furnitureOwned:[];
 // Legacy starter_bed was an automatic free object. It is never valid in the current room design.
 // Remove it on EVERY load so old saves cannot keep resurrecting the bed after a one-time migration.
 state.furniturePlaced=state.furniturePlaced.filter(f=>f?.id!=='starter_bed');
 state.furnitureOwned=state.furnitureOwned.filter(id=>id!=='starter_bed');
 state.layoutRevision=Number(state.layoutRevision)||0;
 const battlePreviewIds=['spar','green_slime','mushroom','fox','golem','shadowbat','scarab','shellbug','firemage','minotaur','leafling','drone'];
 if(!state.battle||typeof state.battle!=='object')state.battle={running:false,enemyLevel:1,enemyId:'spar',enemyName:'파란 슬라임',enemyType:'balanced',enemyHp:0,enemyMax:0,myHp:0,myMax:0,myGauge:0,enemyGauge:0,ult:0,awaken:0,awakened:false,awakenTurns:0,tempEvolution:null,tempEvolvedOnce:false,tempEvolutionFxUntil:0,streak:0,startedAt:0,lastQuizAt:0,score:0,enemyGuard:0,myGuard:0,status:{},enemyStatus:{},turn:0,logs:[],awakenFxUntil:0};
 if(!state.battle.running&&!battlePreviewIds.includes(state.battle.enemyId)){state.battle.enemyId='spar';state.battle.enemyName='파란 슬라임';state.battle.enemyType='balanced';state.battle.enemyLevel=1;state.battle.enemyHp=0;state.battle.enemyMax=0;}
 if(state.layoutRevision<3){
  if(state.furniturePlaced.length===0&&Array.isArray(state.furnitureOwned)&&state.furnitureOwned.includes('starter_bed')){
   state.furniturePlaced.push({id:'starter_bed',x:.33,y:.74,room:'living'});
  }
  const legacyStarter=(state.furniturePlaced||[]).find(f=>f.id==='starter_bed'&&f.room==='living');
  if(legacyStarter&&Math.abs((legacyStarter.x??0)-.50)<.03&&Math.abs((legacyStarter.y??0)-.72)<.04){legacyStarter.x=.33;legacyStarter.y=.74;}
  state.layoutRevision=3;
 }
 return state;
}
function loadState(){
 try{
  const raw=localStorage.getItem(SAVE_KEY);
  if(!raw)return createState();
  const parsed=JSON.parse(raw);
  return parsed?.version===SAVE_VERSION?normalizeState(parsed):createState();
 }catch(e){console.warn('save load failed',e);return createState();}
}
function saveState(state){state.updatedAt=now();state.lastSeen=now();localStorage.setItem(SAVE_KEY,JSON.stringify(state));}
function clearState(){localStorage.removeItem(SAVE_KEY);}

// ===== systems.js =====
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const rnd=(a,b)=>Math.floor(Math.random()*(b-a+1))+a;
const pick=a=>a[Math.floor(Math.random()*a.length)];
const dayMs=86400000;

const BASE_STAT_SOFT_CAPS={attack:48,defense:48,hp:112,agility:44,intelligence:48,evolution:42};
function permanentGainScale(p,key){
 const cap=BASE_STAT_SOFT_CAPS[key]||48,cur=Number(p[key]||0),ratio=Math.max(0,cur/cap);
 if(ratio<.55)return 1;
 if(ratio<.75)return .72;
 if(ratio<.9)return .48;
 if(ratio<1)return .28;
 return .10;
}
function addPermanentStat(p,key,amount){
 if(!Number.isFinite(amount)||amount<=0)return 0;
 const scaled=amount*permanentGainScale(p,key),hard=(BASE_STAT_SOFT_CAPS[key]||48)*1.18;
 const before=Number(p[key]||0);p[key]=Math.min(hard,before+scaled);return p[key]-before;
}
function levelGrowthFactor(level){return level<15?1:level<30?.78:level<45?.56:.38;}

const HUNT_ENTRY_COST=2;
const HUNT_UPKEEP_COST=1;
const HUNT_UPKEEP_MINUTES=10;
const shuffle=a=>{const b=[...a];for(let i=b.length-1;i>0;i--){const j=rnd(0,i);[b[i],b[j]]=[b[j],b[i]];}return b;};
const round=(v,n=2)=>Number(v.toFixed(n));
function mainPet(state){const id=state.hunt?.running?state.hunt.petId:state.battle?.running?state.battle.petId:state.mainPetId;return state.pets.find(p=>p.id===id)||state.pets[0]||null;}
function addMemory(state,text,type='life',pet=mainPet(state)){const item={t:Date.now(),text,type};state.globalMemories.unshift(item);state.globalMemories=state.globalMemories.slice(0,160);if(pet){pet.memories.unshift(item);pet.memories=pet.memories.slice(0,100);}state.codex.memories.push(type);state.codex.memories=[...new Set(state.codex.memories)];}
function recordAction(p,key){p.actionCounts[key]=(p.actionCounts[key]||0)+1;p.lastAction=key;p.lastActionAt=Date.now();}
function starterOf(p){return starters.find(x=>x.id===p.starter)||starters[0];}
function relationLabel(v){if(v>=80)return '단짝';if(v>=55)return '친구';if(v<=-35)return '경쟁자';if(v<=5)return '라이벌';return '아는 사이';}

function applyOffline(state){const p=mainPet(state);if(!p)return '';const pass=ownedPassiveEffects(state),now=Date.now(),last=state.lastSeen||now,elapsed=Math.max(0,now-last),days=Math.floor(elapsed/dayMs),hours=Math.min(8,elapsed/3600000);p.absenceDays=days;if(hours>=.5){const f=offlineFacilities.find(x=>x.id===state.offlineFacility)||offlineFacilities[0];const care=Math.max(.35,p.condition/100)*(1+(activeBoost(state,'offline')?.rate||0));if(f.id==='rest'){p.condition=clamp(p.condition+hours*2.4*(1+(pass.recovery||0)),0,100);p.fatigue=clamp(p.fatigue-hours*4*(1+(pass.restEfficiency||0)),0,100);p.mood=clamp(p.mood+hours*.5*(1+(pass.mood||0)),0,100);}else{p.exp+=hours*2.3*care;if(f.stat)addPermanentStat(p,f.stat,hours*.06*care);if(f.domain){const m=p.mastery[f.domain];m.xp+=hours*.35*care;masteryLevel(p,f.domain);}levelCheck(state,p);}}
 if(days>=1){p.hunger=clamp(p.hunger-days*3,20,100);p.fatigue=clamp(p.fatigue+days*2,0,100);p.mood=clamp(p.mood-Math.min(22,days*1.4),20,100);if(days>=7){p.condition=clamp(p.condition-Math.min(22,days),20,100);p.bond=clamp(p.bond-Math.min(7,(days-6)*.5),20,100);p.roomMess=clamp(p.roomMess+(days-6)*3,0,100);}if(days>=14&&p.stage===3){p.temporaryRegression=true;addMemory(state,'오래 쉬는 동안 잠시 2단계 모습으로 돌아갔다. 성장 기록은 그대로 남아 있다.','regression');}if(days>=30&&p.bond<45&&p.conflictCount>=4&&!p.parting){p.parting={stage:'thinking',since:now};addMemory(state,'오랜 거리감 때문에 펫이 앞으로 어떻게 지낼지 고민하기 시작했다.','parting');}return petDialogue(p,'return');}return '';
}

function interact(state,action){
 const p=mainPet(state);if(!p)return '';
 checkDailyReset(state);
 let msg='';
 const adolescent=p.adolescence,refuse=adolescent&&Math.random()<clamp(.16+(100-p.bond)/300+(p.primary==='반항적'?.15:0),.08,.5);
 if(refuse&&['pet','hold','train'].includes(action)){
  p.personalityXP['독립적']=(p.personalityXP['독립적']||0)+.5;recordAction(p,`refuse-${action}`);
  return pick(['지금은 혼자 있고 싶다며 살짝 피한다.','잠깐만, 이따가 하자고 말한다.','자기 방식대로 해보고 싶다며 고개를 젓는다.']);
 }
 const tinyPraiseGrowth=()=>{
  addPermanentStat(p,'attack',.02);addPermanentStat(p,'defense',.02);addPermanentStat(p,'hp',.04);
  addPermanentStat(p,'agility',.02);addPermanentStat(p,'intelligence',.02);addPermanentStat(p,'evolution',.02);
 };
 const roughCareGrowth=()=>{
  addPermanentStat(p,'attack',.03);
  p.hp=Math.max(8,p.hp-.05);
  p.morality-=1.2;
 };
 const A={
  praise:()=>{
   state.daily.praise=Number(state.daily.praise||0);
   if(state.daily.praise>=3)return '칭찬은 언제 들어도 좋지만, 오늘의 성장 효과는 이미 충분히 받았어.';
   state.daily.praise++;tinyPraiseGrowth();p.bond+=1.2;p.mood+=3;p.morality+=.35;
   p.personalityXP['낙천적']=(p.personalityXP['낙천적']||0)+.4;
   return `칭찬을 듣고 눈이 반짝인다. 오늘 칭찬 성장 ${state.daily.praise}/3`;
  },
  pet:()=>{p.bond+=2;p.mood+=3;return adolescent?'투덜거리면서도 손길은 피하지 않았다.':'기분 좋게 몸을 기대온다.';},
  hold:()=>{if(p.stage===3&&['독립적','반항적'].includes(p.primary)&&Math.random()<.4)return '이제는 다 컸다며 직접 걸어가겠다고 한다.';p.bond+=.7;return p.stage===1?'품에 폭 안겨 온다.':'잠깐 안겼다가 내려달라고 한다.';},
  play:()=>{p.mood+=8;p.hunger-=2;p.condition-=2;p.bond+=1;state.daily.play++;p.personalityXP['장난꾸러기']=(p.personalityXP['장난꾸러기']||0)+.6;return '한참 뛰어놀고 만족한 표정을 짓는다.';},
  feed:()=>{const id=Object.keys(state.inventory).find(id=>(state.inventory[id]||0)>0&&shops.some(x=>x.id===id&&x.kind==='food'));return id?useFood(state,id):'먹일 음식이 없어. 상점에서 먹이를 준비해 줘.';},
  talk:()=>{p.bond+=.8;return petDialogue(p);},
  train:()=>{if(p.condition<20)return '너무 피곤해서 훈련보다 휴식이 필요해 보인다.';p.condition-=5;addPermanentStat(p,'attack',.06);addPermanentStat(p,'defense',.06);addPermanentStat(p,'agility',.06);p.personalityXP['성실함']=(p.personalityXP['성실함']||0)+1;state.daily.train++;return '짧게 기본 훈련을 했다. 직접 학습보다 성장량은 작다.';},
  scold:()=>{roughCareGrowth();p.bond-=2.2;p.mood-=3;p.conflictCount++;p.personalityXP['반항적']=(p.personalityXP['반항적']||0)+.75;return '강하게 흔들어 혼내자 몸에 힘이 들어갔다. 공격은 아주 조금 늘었지만 체력과 도덕성은 떨어졌다.';},
  hit:()=>{roughCareGrowth();p.bond-=1.4;p.mood-=2.5;p.conflictCount++;p.personalityXP['반항적']=(p.personalityXP['반항적']||0)+.5;recordAction(p,'bicker');return pick(['깜짝 놀라 뒤로 폴짝 물러난다.','볼을 부풀리고 잠깐 등을 돌린다.','툭 맞고는 억울한 표정으로 쳐다본다.']);},
  bicker:()=>{roughCareGrowth();p.bond-=2;p.mood-=3;p.conflictCount++;p.personalityXP['경쟁적']=(p.personalityXP['경쟁적']||0)+.8;return pick(['쿠션을 툭 던지고는 반대쪽을 본다.','잠깐 말이 없어졌다가 먼저 슬쩍 쳐다본다.','티격태격했지만 금방 진정했다.']);}
 };
 msg=(A[action]||(()=>''))();
 for(const k of ['bond','mood','morality','hunger','condition'])p[k]=clamp(p[k],0,100);
 recordAction(p,action);window.PetLife.action(p,action);updatePersonality(p);recoverRegression(state,p);checkLifeMilestones(state);checkEvolution(state,p);return msg;
}

function petDialogue(p,context='auto'){return window.PetLife.line(p,context);}
function proactiveDialogue(state){const p=mainPet(state);if(!p||Date.now()-p.lastDialogueAt<45000)return null;let chance=.08+(p.primary==='다정함'?.08:0)+(p.bond>80?.05:0)-(p.absenceDays>=3?.03:0);if(Math.random()>chance)return null;return petDialogue(p);}

const quizFactories={
 '덧셈':[
  k=>{const a=rnd(2,20*k),b=rnd(2,20*k);return [`${a} + ${b} = ?`,a+b,'두 수 더하기'];},
  k=>{const a=rnd(10,35*k),b=rnd(5,25*k),c=rnd(2,15*k);return [`${a} + ${b} + ${c} = ?`,a+b+c,'세 수 더하기'];},
  k=>{const total=rnd(20,60*k),a=rnd(3,total-3);return [`□ + ${a} = ${total}. □는?`,total-a,'빈칸 덧셈'];},
  k=>{const a=rnd(5,20*k),b=rnd(5,20*k);return [`사과 ${a}개와 귤 ${b}개가 있다. 모두 몇 개?`,a+b,'문장제 더하기'];}
 ],
 '뺄셈':[
  k=>{let a=rnd(12,35*k),b=rnd(2,a-1);return [`${a} - ${b} = ?`,a-b,'두 수 빼기'];},
  k=>{let a=rnd(25,60*k),b=rnd(5,Math.floor(a/2)),c=rnd(2,Math.max(2,a-b-1));return [`${a} - ${b} - ${c} = ?`,a-b-c,'연속 빼기'];},
  k=>{let a=rnd(15,40*k),d=rnd(2,12*k);return [`□ - ${d} = ${a}. □는?`,a+d,'빈칸 뺄셈'];},
  k=>{let a=rnd(20,60*k),b=rnd(3,a-2);return [`스티커 ${a}장 중 ${b}장을 썼다. 남은 장수는?`,a-b,'문장제 빼기'];}
 ],
 '곱셈':[
  k=>{const a=rnd(2,9+3*k),b=rnd(2,9+3*k);return [`${a} × ${b} = ?`,a*b,'기본 곱셈'];},
  k=>{const a=rnd(2,8+k),b=rnd(2,8+k),c=rnd(2,4+k);return [`${a} × ${b} × ${c} = ?`,a*b*c,'세 수 곱셈'];},
  k=>{const a=rnd(2,12),b=rnd(3,12);return [`한 상자에 ${a}개씩 ${b}상자라면 모두 몇 개?`,a*b,'묶음 문장제'];},
  k=>{const a=rnd(2,12),b=rnd(2,12);return [`가로 ${a}, 세로 ${b}인 격자의 칸 수는?`,a*b,'격자 곱셈'];}
 ],
 '나눗셈':[
  k=>{const b=rnd(2,9+k),q=rnd(2,12+k),a=b*q;return [`${a} ÷ ${b} = ?`,q,'나누어떨어짐'];},
  k=>{const q=rnd(2,12),b=rnd(2,9),a=q*b;return [`${a}개를 ${q}명에게 똑같이 나누면 한 명당?`,b,'등분 문장제'];},
  k=>{const b=rnd(2,9),q=rnd(2,12),a=b*q;return [`□ ÷ ${b} = ${q}. □는?`,a,'빈칸 나눗셈'];},
  k=>{const each=rnd(2,9),groups=rnd(2,12),total=each*groups;return [`${total}개를 ${each}개씩 묶으면 몇 묶음?`,groups,'포함제'];}
 ],
 '분수':[
  k=>{const d=pick([2,3,4,5,6,8,10]),a=rnd(1,d-1),b=rnd(1,d-1);return [`${a}/${d} + ${b}/${d} = ? (소수로)`,round((a+b)/d,2),'동분모 덧셈'];},
  k=>{const d=pick([2,4,5,10]),a=rnd(1,d-1);return [`${a}/${d}를 소수로 나타내면?`,round(a/d,2),'분수→소수'];},
  k=>{const d=pick([3,4,5,6,8]),a=rnd(1,d-1),n=d*rnd(2,8+k);return [`${n}의 ${a}/${d}는?`,n*a/d,'전체의 분수'];},
  k=>{const d=pick([4,5,6,8,10]),a=rnd(2,d-1),b=rnd(1,a-1);return [`${a}/${d} - ${b}/${d} = ? (소수로)`,round((a-b)/d,2),'동분모 뺄셈'];}
 ],
 '소수':[
  k=>{const a=round(rnd(10,90*k)/10,1),b=round(rnd(10,90*k)/10,1);return [`${a} + ${b} = ?`,round(a+b,1),'소수 덧셈'];},
  k=>{let a=round(rnd(30,120*k)/10,1),b=round(rnd(10,Math.floor(a*10)-1)/10,1);return [`${a} - ${b} = ?`,round(a-b,1),'소수 뺄셈'];},
  k=>{const a=round(rnd(12,89)/10,1),b=rnd(2,9);return [`${a} × ${b} = ?`,round(a*b,1),'소수 곱셈'];},
  k=>{const a=rnd(1,9),b=rnd(1,9);return [`${a}.${b}에서 소수 첫째 자리 숫자는?`,b,'자릿값'];}
 ],
 '도형':[
  k=>{const a=rnd(3,8*k),b=rnd(3,8*k);return [`가로 ${a}, 세로 ${b}인 직사각형의 넓이는?`,a*b,'직사각형 넓이'];},
  k=>{const a=rnd(3,12*k),b=rnd(3,12*k);return [`가로 ${a}, 세로 ${b}인 직사각형의 둘레는?`,2*(a+b),'직사각형 둘레'];},
  k=>{const a=rnd(3,12*k);return [`한 변이 ${a}인 정사각형의 넓이는?`,a*a,'정사각형 넓이'];},
  k=>{const base=2*rnd(2,10*k),h=rnd(2,10*k);return [`밑변 ${base}, 높이 ${h}인 삼각형의 넓이는?`,base*h/2,'삼각형 넓이'];}
 ],
 '그래프/자료':[
  k=>{const a=[rnd(2,10*k),rnd(2,10*k),rnd(2,10*k),rnd(2,10*k)];return [`자료 ${a.join(', ')}의 합은?`,a.reduce((s,v)=>s+v,0),'자료 합'];},
  k=>{const a=[rnd(2,20*k),rnd(2,20*k),rnd(2,20*k),rnd(2,20*k)];return [`자료 ${a.join(', ')}에서 가장 큰 값은?`,Math.max(...a),'최댓값'];},
  k=>{const a=rnd(3,15*k),b=rnd(3,15*k),c=rnd(3,15*k);return [`월 ${a}, 화 ${b}, 수 ${c}권을 읽었다. 가장 많이 읽은 날의 권수는?`,Math.max(a,b,c),'표 해석'];},
  k=>{const x=rnd(2,12),a=[x,x+2,x+4,x+6];return [`자료 ${a.join(', ')}의 평균은?`,x+3,'평균'];}
 ],
 '비율/비례':[
  k=>{const a=rnd(2,8),b=rnd(2,8),m=rnd(2,7+k);return [`${a}:${b}와 같은 비에서 앞항이 ${a*m}이면 뒷항은?`,b*m,'비례식'];},
  k=>{const unit=rnd(2,8),n=rnd(2,10);return [`${n}개가 ${unit*n}원이라면 1개 가격은?`,unit,'단위량'];},
  k=>{const a=rnd(2,8),b=rnd(2,8),m=rnd(2,6);return [`${a}:${b} = ${a*m}:□. □는?`,b*m,'비의 성질'];},
  k=>{const speed=rnd(2,9),time=rnd(2,8);return [`1분에 ${speed}m씩 ${time}분 가면 몇 m?`,speed*time,'정비례 문장제'];}
 ],
 '혼합계산':[
  k=>{const a=rnd(2,15*k),b=rnd(2,9),c=rnd(2,9);return [`${a} + ${b} × ${c} = ?`,a+b*c,'덧셈+곱셈'];},
  k=>{const b=rnd(2,8),c=rnd(2,8),a=b*c+rnd(2,15*k);return [`${a} - ${b} × ${c} = ?`,a-b*c,'뺄셈+곱셈'];},
  k=>{const a=rnd(2,9),b=rnd(2,9),c=rnd(2,9);return [`(${a} + ${b}) × ${c} = ?`,(a+b)*c,'괄호 계산'];},
  k=>{const d=rnd(2,8),q=rnd(2,9),x=rnd(2,15);return [`${d*q} ÷ ${d} + ${x} = ?`,q+x,'나눗셈+덧셈'];}
 ]
};
function distractors(ans){const set=new Set([ans]);const span=Math.max(2,Math.ceil(Math.abs(ans)*.18));while(set.size<4){let v;if(Number.isInteger(ans))v=ans+rnd(-span,span);else v=round(ans+rnd(-span*10,span*10)/10,2);if(v>=0)set.add(v);}return shuffle([...set]);}
function makeQuiz(domain='덧셈',difficulty='보통',avoidTypes=[]){const k={쉬움:1,보통:2,어려움:3,도전:4}[difficulty]||2,pool=quizFactories[domain]||quizFactories['덧셈'];let indices=pool.map((_,i)=>i).filter(i=>!avoidTypes.includes(`${domain}:${i}`));if(!indices.length)indices=pool.map((_,i)=>i);const idx=pick(indices),[q,ans,label]=pool[idx](k);return {domain,difficulty,q,ans:round(ans,2),opts:distractors(round(ans,2)),type:`${domain}:${idx}`,label,createdAt:Date.now()};}
function answerStudy(state,quiz,value){const p=mainPet(state),m=p.mastery[quiz.domain],pass=ownedPassiveEffects(state);p.totalQuestions++;m.count++;m.recentTypes=[quiz.type,...(m.recentTypes||[]).filter(x=>x!==quiz.type)].slice(0,2);const ok=Math.abs(Number(value)-quiz.ans)<.0001;if(ok){p.correct++;m.correct++;p.studyStreak++;p.bestStreak=Math.max(p.bestStreak,p.studyStreak);const mult=difficulties[quiz.difficulty]||1,boost=activeBoost(state,'study')?.rate||0,repetitionPenalty=(m.recentTypes.filter(x=>x===quiz.type).length>1?.85:1);const g=mult*(1+boost+pass.study)*repetitionPenalty;domainWeights[quiz.domain].forEach((w,i)=>{if(w>0)addPermanentStat(p,stats[i],w*.085*g);});m.xp+=6*g;p.exp+=5*g;state.daily.study++;const seasonStudy=currentSeason().id==='autumn'?1.1:1;state.economy.studyProgress+=mult*seasonStudy;if(state.economy.studyProgress>=7&&state.daily.studyStars<10){const earned=Math.floor(state.economy.studyProgress/7);const grant=Math.min(earned,10-state.daily.studyStars);state.economy.studyProgress-=grant*7;state.stars+=grant;state.daily.studyStars+=grant;state.economy.totalEarned+=grant;}p.personalityXP['성실함']=(p.personalityXP['성실함']||0)+.25;masteryLevel(p,quiz.domain);levelCheck(state,p);if(p.totalQuestions===1)addMemory(state,'처음으로 수학 문제를 풀었다.','first-study');if(p.studyStreak%5===0)addMemory(state,`${p.studyStreak}문제를 연속으로 맞혔다.`,'study-streak');updateTitles(state);generateDiary(state);return true;}p.studyStreak=0;m.wrongReview++;state.daily.review++;return false;}
function masteryLevel(p,d){const m=p.mastery[d];while(m.xp>=m.level*45){m.xp-=m.level*45;m.level++;}}
function levelCheck(state,p=mainPet(state)){let need=Math.round(34*Math.pow(p.level,1.16));while(p.exp>=need){p.exp-=need;p.level++;const gf=levelGrowthFactor(p.level);addPermanentStat(p,'hp',2.3*gf);addPermanentStat(p,'attack',.58*gf);addPermanentStat(p,'defense',.58*gf);addPermanentStat(p,'agility',.48*gf);addPermanentStat(p,'intelligence',.48*gf);addPermanentStat(p,'evolution',.38*gf);addMemory(state,`레벨 ${p.level}이 되었다.`,'level',p);need=Math.round(34*Math.pow(p.level,1.16));}checkEvolution(state,p);checkAdolescence(state,p);}
function checkEvolution(state,p=mainPet(state)){
 // 1단계에서 정해진 계통은 이후 진화에서도 바뀌지 않는다. 2단계는 별도 선택/재추첨 없이 같은 starter(lineage)를 그대로 사용한다.
 if(p.stage>=1&&!p.lineage)p.lineage=p.starter;
 if(p.stage===1&&p.level>=12&&p.totalQuestions>=35&&p.bond>=60&&p.evolution>=10)evolve(state,p,2,'첫 진화에서 정해진 계통을 그대로 이어 충분한 레벨·학습·관계·진화력이 함께 쌓여');
 if(false /* Stage 3 evolution temporarily locked */ &&p.stage===2&&p.level>=13&&p.totalQuestions>=65&&p.evolution>=13){
  const a=[p.attack,p.defense,p.hp/2,p.agility,p.intelligence],spread=Math.max(...a)-Math.min(...a),breadth=domains.filter(d=>p.mastery[d].level>=3).length;
  let form='normal',ok=false;
  if(spread<=6&&breadth>=6&&p.bond>=82&&p.morality>=55){form='rare-balance';ok=true;}
  else if(p.attack>=17&&(p.mastery['덧셈'].level>=3||p.mastery['곱셈'].level>=3)){form='power';ok=true;}
  else if(p.agility>=17&&(p.mastery['나눗셈'].level>=3||p.mastery['소수'].level>=3)){form='speed';ok=true;}
  else if(p.intelligence>=17&&(p.mastery['그래프/자료'].level>=3||p.mastery['분수'].level>=3)){form='mind';ok=true;}
  else if(breadth>=4&&p.bond>=68){form='balanced';ok=true;}
  if(ok){p.evolutionForm=form;evolve(state,p,3,form==='rare-balance'?'균형 성장·관계·도덕성까지 희귀 조건을 만족해':'성장 조건과 진화력을 만족해');}
 }
}
function evolve(state,p,stage,reason){if(stage>=3)return false; /* Stage 3 preview assets only; evolution locked. */const fromStage=Number(p.stage||Math.max(0,stage-1)),form=stage===3?(p.evolutionForm||'normal'):'normal';if(stage>=2&&p.lineage&&p.starter!==p.lineage)p.starter=p.lineage;p.stage=stage;p.lastEvolutionEvent={id:`${Date.now()}-${stage}`,stage,fromStage,reason,form,at:Date.now()};p.growthPath=Array.isArray(p.growthPath)?p.growthPath:[];p.growthPath.push(`${stage}:${form}`);state.codex.evolutions.push(`${p.starter}-${stage}-${form}`);state.codex.stages.push(`${p.starter}-${stage}`);state.codex.evolutions=[...new Set(state.codex.evolutions)];state.codex.stages=[...new Set(state.codex.stages)];p.mood=100;if(!p.firstEvolution)p.firstEvolution=Date.now();if(stage===3&&p.adolescence){p.adolescence=false;addMemory(state,'사춘기를 지나 한층 안정된 모습이 되었다.','adolescence-end',p);}addMemory(state,`${reason} ${stage}단계로 진화했다.`,'evolution',p);if(stage===3)addMemory(state,'3단계 성장에 도달했다.','stage3',p);checkCodexRewards(state);}
function checkAdolescence(state,p){if(!p.adolescenceSeen&&p.stage===2&&p.level>=10){p.adolescence=true;p.adolescenceSeen=true;addMemory(state,'성장기 중반, 스스로 결정하고 싶어 하는 사춘기 시기가 시작됐다.','adolescence',p);}if(p.adolescence&&p.stage===3){p.adolescence=false;addMemory(state,'사춘기를 지나 한층 안정된 모습이 되었다.','adolescence-end',p);}}
function recoverRegression(state,p){if(p.temporaryRegression&&p.goodCareCount>=3&&p.totalQuestions>0&&p.bond>=50){p.temporaryRegression=false;addMemory(state,'다시 돌봄과 학습을 이어가며 원래 성장 단계의 모습으로 회복했다.','regression-recover',p);}}
function updatePersonality(p){const entries=Object.entries(p.personalityXP).sort((a,b)=>b[1]-a[1]);if(entries[0])p.primary=entries[0][0];if(entries[1])p.secondary=entries[1][0];}
function updateTitles(state){const p=mainPet(state);let changed=true;while(changed){changed=false;for(const [name,test] of titleRules){if(test(p)&&!p.titles.includes(name)){p.titles.push(name);p.titleHistory.push({t:Date.now(),name});state.codex.titles.push(name);addMemory(state,`새 칭호 '${name}'을 얻었다.`,'title');changed=true;}}}state.codex.titles=[...new Set(state.codex.titles)];}
function setRepresentativeTitle(state,name){const p=mainPet(state);if(!name||p.titles.includes(name))p.representativeTitle=name||'';}


function dailyShopItems(state){const day=new Date().toISOString().slice(0,10);if(state.shop.dailySeed!==day||!state.shop.recommendations?.length){state.shop.dailySeed=day;const p=mainPet(state),functional=shops.filter(x=>x.kind==='furniture'),consumable=shops.filter(x=>x.kind==='food'),decor=shops.filter(x=>x.kind==='decor'||x.kind==='boost');const liked=functional.filter(x=>starterOf(p).likes.includes(x.id));state.shop.recommendations=[...new Set([...(liked.length?liked:[pick(functional)]),...shuffle(functional).slice(0,4),...shuffle(consumable).slice(0,3),...shuffle(decor).slice(0,2)].map(x=>x.id))].slice(0,9);}return state.shop.recommendations.map(id=>shops.find(x=>x.id===id)).filter(Boolean);}
function codexCount(state){const c=state.codex;return ['species','stages','zones','exploration','titles','evolutions','furniture','skills','ultimates','memories','personalities','decor'].reduce((n,k)=>n+new Set(c[k]||[]).size,0)+(c.awaken?1:0);}
function checkCodexRewards(state){const milestones=[[10,'별 4개',()=>{state.stars+=4;state.economy.totalEarned+=4;}],[20,'별 6개',()=>{state.stars+=6;state.economy.totalEarned+=6;}],[35,'진화 힌트',()=>state.inventory.evolution_hint=(state.inventory.evolution_hint||0)+1],[50,'특별 배경',()=>{state.inventory.codex_wallpaper=(state.inventory.codex_wallpaper||0)+1;state.codex.decor.push('codex_wallpaper');}]];const total=codexCount(state),got=[];for(const [need,label,fn] of milestones){if(total>=need&&!state.codexRewards.includes(need)){state.codexRewards.push(need);fn();got.push(label);addMemory(state,`도감 ${need}단계 보상으로 ${label}을 받았다.`,'codex-reward');}}return got;}
function seasonShop(state){const s=currentSeason();return [{id:`${s.id}_decor`,name:`${s.name} 시즌 가구`,price:95,type:'decor'},{id:`${s.id}_aura`,name:`${s.name} 오라`,price:78,type:'decor'},{id:`${s.id}_food`,name:`${s.name} 간식 꾸러미`,price:22,type:'food'}];}
function buySeasonItem(state,id){const item=seasonShop(state).find(x=>x.id===id);if(!item)return {ok:false,msg:'시즌 상품이 없어.'};const key=`${new Date().getFullYear()}-${id}`;if(state.seasonShopBought[key])return {ok:false,msg:'이번 시즌에 이미 교환했어.'};if(state.stars<item.price)return {ok:false,msg:'별이 부족해.'};state.stars-=item.price;state.economy.totalSpent+=item.price;state.seasonShopBought[key]=true;if(item.type==='food'){state.inventory.apple=(state.inventory.apple||0)+2;state.inventory.milk=(state.inventory.milk||0)+1;}else{state.inventory[id]=(state.inventory[id]||0)+1;state.codex.decor.push(id);}addMemory(state,`${item.name}을 시즌 상점에서 교환했다.`,'season-shop');checkCodexRewards(state);return {ok:true,msg:`${item.name} 교환 완료.`};}

function ownedShopItem(state,it){if(it.kind==='furniture')return state.furnitureOwned.includes(it.id);if(it.kind==='decor')return (state.inventory[it.id]||0)>0;if(it.kind==='service'){if(it.service==='petSlot')return state.home.petSlots>=it.tier;if(it.service==='storage')return state.home.storageTier>=it.tier;if(it.service==='furnitureCapacity')return state.home.furnitureCapacity>=(it.tier===1?6:7);}return false;}
function equipDecor(state,id){const it=shops.find(x=>x.id===id&&x.kind==='decor');if(!it||(state.inventory[id]||0)<=0)return {ok:false,msg:'보유한 꾸미기가 아니야.'};state.decor[it.slot]=id;return {ok:true,msg:`${it.name} 적용 완료.`};}
function huntInventoryCapacity(state){return state.home.storageTier>=2?55:state.home.storageTier>=1?40:30;}
function itemInfo(id){const shop=shops.find(x=>x.id===id);if(shop)return {id:shop.id,name:shop.name,rarity:shopRarity(shop),baseValue:shop.price,source:'shop',desc:shop.desc,effect:passiveEffectCatalog[id]||null};const it=itemCatalog[id]||{id,name:id,rarity:'common',baseValue:5,source:'unknown',desc:''};return {...it,effect:passiveEffectCatalog[id]||null};}
function ownedPassiveEffects(state){
 const keys=['study','recovery','mood','bond','food','agility','attack','defense','intelligence','battleGauge','huntXp','huntDrop','restEfficiency','runawayGuard','hungerDrain','fatigueGain','conditionDrain'];
 const totals=Object.fromEntries(keys.map(k=>[k,0]));
 const add=(id,expectedMode)=>{const e=passiveEffectCatalog[id];if(!e||e.mode!==expectedMode)return;for(const [k,v] of Object.entries(e.mods||{}))if(k in totals)totals[k]+=v;};
 const placed=new Set();for(const f of state.furniturePlaced||[]){if(placed.has(f.id))continue;placed.add(f.id);add(f.id,'placed');}
 for(const [id,q] of Object.entries(state.inventory||{}))if(Number(q)>0)add(id,'owned');
 for(const id of Object.values(state.equipment||{}))if(id)add(id,'equipped');
 const food=activeFoodEffects(state);for(const [k,v] of Object.entries(food))if(k in totals)totals[k]+=v;
 const caps={study:[-.08,.06],recovery:[-.08,.12],mood:[-.08,.08],bond:[-.06,.07],food:[-.05,.08],agility:[-.08,.08],attack:[-.08,.10],defense:[-.08,.10],intelligence:[-.08,.12],battleGauge:[-.06,.07],huntXp:[-.06,.07],huntDrop:[-.02,.07],restEfficiency:[-.08,.18],runawayGuard:[0,.30],hungerDrain:[-.08,.08],fatigueGain:[-.08,.10],conditionDrain:[-.08,.08]};
 for(const [k,[lo,hi]] of Object.entries(caps))totals[k]=clamp(totals[k],lo,hi);
 return totals;
}
function effectLabel(id){return passiveEffectCatalog[id]?.label||'';}
function equipmentInfo(state){return {charm:state.equipment?.charm||null,accessory:state.equipment?.accessory||null,relic:state.equipment?.relic||null};}
function equipItem(state,id){const info=itemInfo(id),e=passiveEffectCatalog[id];if(!e||e.mode!=='equipped'||!e.slot)return {ok:false,msg:'장착할 수 없는 아이템이야.'};if((state.inventory[id]||0)<=0)return {ok:false,msg:'보유하지 않은 아이템이야.'};state.equipment=state.equipment||{charm:null,accessory:null,relic:null};const prev=state.equipment[e.slot];state.equipment[e.slot]=id;return {ok:true,msg:prev&&prev!==id?`${info.name} 장착 · 같은 슬롯의 ${itemInfo(prev).name} 해제`:`${info.name} 장착 완료.`};}
function unequipItem(state,slot){if(!state.equipment?.[slot])return {ok:false,msg:'이 슬롯은 비어 있어.'};const id=state.equipment[slot];state.equipment[slot]=null;return {ok:true,msg:`${itemInfo(id).name} 장착 해제.`};}
function isEquipped(state,id){return Object.values(state.equipment||{}).includes(id);}
function sellUnitPrice(id){const info=itemInfo(id);return Math.max(1,Math.floor((info.baseValue||5)/5));}
function sellItem(state,id,qty=1){qty=Math.max(1,Math.floor(qty));const have=Number(state.inventory[id]||0);if(have<qty)return {ok:false,msg:'판매할 수량이 부족해.'};if(isEquipped(state,id))return {ok:false,msg:'장착 중인 아이템은 먼저 해제해야 판매할 수 있어.'};const info=itemInfo(id);if(id.startsWith('season_')||id==='evolution_hint'||id==='codex_wallpaper')return {ok:false,msg:'이 물건은 판매할 수 없어.'};const unit=sellUnitPrice(id),gain=unit*qty;state.inventory[id]=have-qty;state.stars+=gain;state.economy.totalEarned+=gain;state.economy.totalSold=(state.economy.totalSold||0)+gain;return {ok:true,msg:`${info.name} ${qty}개 판매 · 별 +${gain}`};}
function inventorySellables(state){return Object.entries(state.inventory).filter(([,q])=>Number(q)>0).map(([id,q])=>({...itemInfo(id),qty:Number(q),sell:sellUnitPrice(id),equipped:isEquipped(state,id)})).filter(x=>!['evolution_hint','codex_wallpaper'].includes(x.id)&&!x.id.startsWith('season_'));}
function buyItem(state,id){const it=shops.find(x=>x.id===id);if(!it)return {ok:false,msg:'상품이 없다.'};if(it.service==='petSlot')return {ok:false,msg:'함께 키울 수 있는 펫은 최대 두 마리야. 두 번째 공간은 기본으로 열려 있어.'};if(ownedShopItem(state,it)&&it.kind!=='food'&&it.kind!=='boost')return it.kind==='decor'?equipDecor(state,id):{ok:false,msg:'이미 보유한 항목이야.'};if(it.kind==='service'){if(it.service==='petSlot'&&it.tier!==state.home.petSlots+1)return {ok:false,msg:'이전 펫 공간부터 확장해야 해.'};if(it.service==='storage'&&it.tier!==state.home.storageTier+1)return {ok:false,msg:'이전 보관함 확장부터 필요해.'};const currentCap=state.home.furnitureCapacity<=4?0:state.home.furnitureCapacity===6?1:2;if(it.service==='furnitureCapacity'&&it.tier!==currentCap+1)return {ok:false,msg:'이전 가구 배치 확장부터 필요해.'};}if(state.stars<it.price)return {ok:false,msg:'별이 부족해.'};state.stars-=it.price;state.economy.totalSpent+=it.price;if(it.kind==='food')state.inventory[id]=(state.inventory[id]||0)+1;else if(it.kind==='furniture'){state.furnitureOwned.push(id);state.codex.furniture.push(id);}else if(it.kind==='boost')activateBoost(state,it.boost);else if(it.kind==='decor'){state.inventory[id]=1;state.codex.decor.push(id);state.decor[it.slot]=id;}else if(it.kind==='service'){if(it.service==='petSlot')state.home.petSlots=it.tier;else if(it.service==='storage'){state.home.storageTier=it.tier;state.hunt.settings.maxInventory=huntInventoryCapacity(state);}else if(it.service==='furnitureCapacity')state.home.furnitureCapacity=it.tier===1?6:7;}checkCodexRewards(state);return {ok:true,msg:`${it.name} 구매 완료.`};}
function activateBoost(state,boost){const end=state.boosts[boost.type]?.end||Date.now();state.boosts[boost.type]={rate:boost.rate,end:Math.max(end,Date.now())+boost.duration};}
function activeBoost(state,type){const b=state.boosts[type];if(!b)return null;if(b.end<=Date.now()){delete state.boosts[type];return null;}return b;}
function useFood(state,id){const p=mainPet(state),it=shops.find(x=>x.id===id&&x.kind==='food'),pass=ownedPassiveEffects(state);if(!it)return '먹을 수 없는 아이템이야.';if((state.inventory[id]||0)<=0)return `${it.name}이 없어.`;state.inventory[id]--;p.hunger=clamp(p.hunger+(it.hunger||0)*(1+pass.food),0,100);p.mood=clamp(p.mood+(it.mood||2)*(1+pass.mood),0,100);p.condition=clamp(p.condition+(it.condition||0)*(1+pass.recovery),0,100);p.fatigue=clamp(p.fatigue+(it.fatigue||0),0,100);p.bond=clamp(p.bond+(it.bond||.5)*(1+pass.bond),0,100);p.foodBuffs=(p.foodBuffs||[]).filter(b=>b.until>Date.now());if(it.stat&&Object.keys(it.stat).length){p.foodBuffs.push({id:it.id,mods:{...it.stat},until:Date.now()+20*60*1000});}state.daily.feed++;p.goodCareCount++;p.lastFood={id:it.id,name:it.name,style:it.foodStyle||'bite',at:Date.now()};recordAction(p,'feed');window.PetLife.action(p,'feed');recoverRegression(state,p);const reactions={crunch:'바삭바삭 씹고 만족한 표정을 짓는다.',soft:'천천히 맛을 음미한다.',sip:'한 모금씩 마시며 몸을 편안하게 푼다.',bite:'신나게 한입씩 먹어 치운다.',jelly:'말랑한 식감에 눈이 동그래진다.',special:'반짝이는 특별식을 보고 신나게 먹는다.'};const buff=it.stat&&Object.keys(it.stat).length?' 식후 보정은 20분만 유지돼.':'';return `${it.name}을 먹었다. ${reactions[it.foodStyle]||'맛있게 먹었다.'}${buff}`;}

function activeFoodEffects(state){const p=mainPet(state),tot={attack:0,defense:0,hp:0,agility:0,intelligence:0,evolution:0};if(!p)return tot;p.foodBuffs=(p.foodBuffs||[]).filter(b=>b.until>Date.now());for(const b of p.foodBuffs)for(const [k,v] of Object.entries(b.mods||{}))if(k in tot)tot[k]+=v;return tot;}

function furniturePlacementBounds(id){
 const key=String(id||'');
 // Keep only enough margin to prevent large sprites from being clipped.
 // Furniture is otherwise free to move across the usable room area.
 if(key==='starter_bed')return {minX:.13,maxX:.87,minY:.53,maxY:.89,spawnX:.33,spawnY:.72};
 if(/^bed$/.test(key))return {minX:.13,maxX:.87,minY:.53,maxY:.89,spawnX:.66,spawnY:.72};
 if(/sofa|bath/.test(key))return {minX:.12,maxX:.88,minY:.52,maxY:.90,spawnX:.32,spawnY:.72};
 if(/bookshelf|wardrobe|fridge/.test(key))return {minX:.10,maxX:.90,minY:.44,maxY:.86,spawnX:.78,spawnY:.61};
 if(/window/.test(key))return {minX:.12,maxX:.88,minY:.20,maxY:.58,spawnX:.50,spawnY:.38};
 if(/desk|console|training|easel/.test(key))return {minX:.10,maxX:.90,minY:.49,maxY:.89,spawnX:.30,spawnY:.70};
 if(/mirror/.test(key))return {minX:.10,maxX:.90,minY:.28,maxY:.82,spawnX:.78,spawnY:.54};
 if(/lamp|trophy|plant/.test(key))return {minX:.08,maxX:.92,minY:.46,maxY:.90,spawnX:.78,spawnY:.68};
 if(/ball|trampoline|toybox|music/.test(key))return {minX:.08,maxX:.92,minY:.50,maxY:.92,spawnX:.50,spawnY:.74};
 return {minX:.08,maxX:.92,minY:.46,maxY:.92,spawnX:.50,spawnY:.72};
}
function setFurniturePosition(state,id,x,y){const f=state.furniturePlaced.find(v=>v.id===id&&v.room===state.currentRoom);if(!f)return false;const b=furniturePlacementBounds(id);f.x=clamp(x,b.minX,b.maxX);f.y=clamp(y,b.minY,b.maxY);return true;}
function placeFurniture(state,id){if(!state.furnitureOwned.includes(id)||state.furniturePlaced.some(x=>x.id===id&&x.room===state.currentRoom))return false;const count=state.furniturePlaced.filter(x=>x.room===state.currentRoom).length;const cap=Math.min(7,state.home.furnitureCapacity||7);if(count>=cap)return false;const b=furniturePlacementBounds(id);state.furniturePlaced.push({id,x:b.spawnX,y:b.spawnY,room:state.currentRoom});return true;}
function moveFurniture(state,id,x,y){const f=state.furniturePlaced.find(v=>v.id===id&&v.room===state.currentRoom);if(!f)return;const b=furniturePlacementBounds(id);f.x=clamp(x,b.minX,b.maxX);f.y=clamp(y,b.minY,b.maxY);}
function useFurniture(state,id){const p=mainPet(state),it=shops.find(x=>x.id===id&&x.kind==='furniture'),pass=ownedPassiveEffects(state),placed=state.furniturePlaced.find(f=>f.id===id&&f.room===state.currentRoom);if(!it||!placed)return '이 방에 배치된 가구가 아니야.';const rarity=shopRarity(it),rank=rarityMeta[rarity]?.rank||0,mult=1+rank*.08;p.furnitureUses++;p.favoriteFurniture=id;recordAction(p,`furniture:${id}`);const chain=furnitureChains[id]||it.actions||['살펴보기'];const action=pick(chain);p.roomAction={type:'furniture',id,action,at:Date.now(),until:Date.now()+4500,x:placed.x,y:placed.y};if(id==='bed'||id==='sofa'){p.condition=clamp(p.condition+7*mult*(1+(pass.recovery||0)),0,100);p.fatigue=clamp(p.fatigue-10*mult*(1+(pass.restEfficiency||0)),0,100);}if(id==='trampoline'||id==='training'||id==='ball'){p.mood=clamp(p.mood+4*mult,0,100);p.fatigue=clamp(p.fatigue+2,0,100);}if(id==='bookshelf'||id==='desk')p.mood=clamp(p.mood+2*mult,0,100);if(id==='plant'||id==='wardrobe'||id==='mirror'||id==='window')p.mood=clamp(p.mood+3*mult,0,100);if(id==='window'){p.condition=clamp(p.condition+3*mult,0,100);p.fatigue=clamp(p.fatigue-2*mult,0,100);}if(id==='bath'){p.condition=clamp(p.condition+8*mult,0,100);p.fatigue=clamp(p.fatigue-5*mult,0,100);}addMemory(state,`${it.name}에서 ${action} 행동을 했다.`,'furniture');updateTitles(state);return `${it.name}: ${action}`;}


function scheduleNextMischief(p,now=Date.now()){
 const base=p.primary==='장난꾸러기'||p.primary==='반항적'?[12,28]:p.primary==='성실함'||p.primary==='다정함'?[30,58]:[20,45];
 const moralityDelay=Math.max(0,(p.morality-60)*.18);
 p.nextMischiefAt=now+(rnd(base[0],base[1])+moralityDelay)*60000;
}
function maybeMischief(state,p){
 const now=Date.now();
 if(!p.nextMischiefAt){scheduleNextMischief(p,now);return null;}
 if(now<p.nextMischiefAt||p.runaway)return null;
 scheduleNextMischief(p,now);
 const risk=clamp(.38+(60-p.morality)/120+(p.primary==='장난꾸러기'?.22:0)+(p.primary==='반항적'?.16:0)-(p.primary==='성실함'?.18:0),.16,.78);
 if(Math.random()>risk)return null;
 const foods=['apple','milk','nuts'].filter(id=>(state.inventory[id]||0)>0);
 const events=[
  ()=>{p.roomMess=clamp(p.roomMess+8,0,100);p.mood=clamp(p.mood+2,0,100);return `${p.name}이 신나게 뛰다가 방을 조금 어질렀다.`;},
  ()=>{if(!foods.length)return null;const id=pick(foods);state.inventory[id]--;p.hunger=clamp(p.hunger+6,0,100);p.morality=clamp(p.morality-.5,0,100);return `${p.name}이 몰래 간식 하나를 꺼내 먹었다.`;},
  ()=>{if(state.stars<1)return null;state.stars-=1;state.economy.totalSpent+=1;p.morality=clamp(p.morality-.4,0,100);return `${p.name}이 장난치다 작은 물건을 망가뜨려 수리비로 별 1개가 들었다.`;},
  ()=>{p.condition=clamp(p.condition-2,0,100);p.fatigue=clamp(p.fatigue+3,0,100);return `${p.name}이 혼자 무리해서 놀다가 조금 지쳤다.`;}
 ];
 let msg=null;
 for(const fn of shuffle(events)){msg=fn();if(msg)break;}
 if(!msg)return null;
 recordAction(p,'mischief');
 addMemory(state,msg,'mischief',p);
 return msg;
}
function lifeTick(state){const p=mainPet(state);if(!p)return null;const pass=ownedPassiveEffects(state);p.hunger=clamp(p.hunger-.18*(1+(pass.hungerDrain||0)),0,100);p.fatigue=clamp(p.fatigue+.12*(1+(pass.fatigueGain||0)),0,100);p.condition=clamp(p.condition-.07*(currentSeason().id==='winter'?.9:1)*(1+(pass.conditionDrain||0)),0,100);if(p.hunger<25)p.mood=clamp(p.mood-.16,0,100);if(p.condition<20||p.fatigue>80)p.mood=clamp(p.mood-.10,0,100);checkRunaway(state,p);advanceRelationships(state);generateDiary(state);const trouble=maybeMischief(state,p);return trouble||autonomousAction(state,p)||proactiveDialogue(state);}
function autonomousAction(state,p){if(Date.now()-p.lastActionAt<8500)return null;const roomPlaced=state.furniturePlaced.filter(f=>f.room===state.currentRoom),roomFurniture=roomPlaced.map(f=>f.id),windowPlaced=roomPlaced.find(f=>f.id==='window');let pool=[['방 걷기',4],['멍때리기',1],['사용자에게 다가오기',p.bond/30],['사용자 기다리기',p.bond/35]];if(windowPlaced)pool.push(['창밖 보기',2],['창 열어보기',1.3]);for(const id of roomFurniture){const it=shops.find(x=>x.id===id);for(const a of it?.actions||[])pool.push([`${id}:${a}`,2+(starterOf(p).likes.includes(id)?3:0)+(p.primary==='호기심 많음'?1:0)]);}if(p.hunger<35)pool.push(['간식 찾기',6]);if(p.condition<30)pool.push(['잠깐 눕기',7]);if(p.primary==='장난꾸러기')pool.push(['가구에 장난치기',3]);if(p.primary==='독립적')pool.push(['혼자 놀기',3]);pool=pool.filter(([a])=>a!==p.lastAction);const total=pool.reduce((s,x)=>s+x[1],0);let r=Math.random()*total,chosen=pool[0][0];for(const [a,w] of pool){r-=w;if(r<=0){chosen=a;break;}}recordAction(p,chosen);if(chosen.includes(':')){const [id,action]=chosen.split(':');const f=state.furniturePlaced.find(v=>v.id===id&&v.room===state.currentRoom);if(f){p.furnitureUses++;p.roomAction={type:'furniture',id,action,at:Date.now(),until:Date.now()+4200,x:f.x,y:f.y};if(id==='bed'||id==='sofa'){p.fatigue=clamp(p.fatigue-3,0,100);p.condition=clamp(p.condition+2,0,100);}else if(id==='training'||id==='trampoline'||id==='ball'){p.mood=clamp(p.mood+2,0,100);p.fatigue=clamp(p.fatigue+1,0,100);}else if(id==='bath'){p.condition=clamp(p.condition+3,0,100);p.fatigue=clamp(p.fatigue-2,0,100);}else if(id==='fridge'&&p.hunger<55){p.hunger=clamp(p.hunger+2,0,100);}else if(['wardrobe','mirror','music','console','plant','bookshelf','desk'].includes(id)){p.mood=clamp(p.mood+1.5,0,100);}}}else if(chosen==='창밖 보기'||chosen==='창 열어보기'){const rs=state.roomStates||(state.roomStates={});const room=rs[state.currentRoom]||(rs[state.currentRoom]={windowOpen:false});const wf=(state.furniturePlaced||[]).find(v=>v.id==='window'&&v.room===state.currentRoom);if(chosen==='창 열어보기')room.windowOpen=!room.windowOpen;p.mood=clamp(p.mood+.8,0,100);p.roomAction={type:'window',action:chosen,at:Date.now(),until:Date.now()+3800,x:wf?.x??.24,y:wf?.y??.47};}if(chosen==='가구에 장난치기'){p.morality=clamp(p.morality-.3,0,100);recordAction(p,'mischief');}return `${p.name}: ${chosen}`;}
const RUNAWAY_SEARCH_COST=3;
function resolveRunaway(state){const p=mainPet(state);if(!p?.runaway)return '가출 중이 아니야.';if(state.stars<RUNAWAY_SEARCH_COST)return `찾으러 가려면 별 ${RUNAWAY_SEARCH_COST}개가 필요해.`;state.stars-=RUNAWAY_SEARCH_COST;state.economy.totalSpent+=RUNAWAY_SEARCH_COST;p.runaway=null;p.returns++;p.bond=clamp(p.bond+6,0,100);p.morality=clamp(p.morality+3,0,100);p.conflictCount=Math.max(0,p.conflictCount-2);addMemory(state,'흔적을 따라 찾아가 대화와 작은 미션을 마치고 함께 돌아왔다.','return');updateTitles(state);return `별 ${RUNAWAY_SEARCH_COST}개를 사용해 흔적을 따라가 이야기한 뒤 함께 돌아왔다.`;}
function checkRunaway(state,p){if(p.runaway)return;const pass=ownedPassiveEffects(state),risk=(p.adolescence?8:0)+(100-p.morality)/5+(100-p.bond)/4+(p.absenceDays>=10?10:0)+p.conflictCount*1.5;if(risk>50&&Math.random()<.0008*(1-(pass.runawayGuard||0))){p.runaway={since:Date.now(),clue:pick(['창가에 작은 메모가 남아 있다.','좋아하던 가구 옆에 발자국이 이어져 있다.','문 앞에 작은 장식 하나가 떨어져 있다.'])};p.runaways++;addMemory(state,'펫이 잠시 혼자 생각할 시간이 필요하다며 방을 나갔다.','runaway');}}
function resolveParting(state,action){const p=mainPet(state);if(!p?.parting)return '이별 고민 상태가 아니야.';if(action==='talk'){p.bond+=5;p.parting.stage='talked';return '서로 서운했던 일을 천천히 이야기했다.';}if(action==='favorite'){p.bond+=4;p.mood+=8;p.parting.stage='gifted';return '좋아하던 물건을 함께 보며 추억을 떠올렸다.';}if(action==='study'){if(p.totalQuestions<1)return '먼저 문제를 하나 같이 풀어보자.';p.bond+=6;p.parting=null;p.conflictCount=Math.max(0,p.conflictCount-3);addMemory(state,'관계를 다시 회복하기로 하고 함께 지내기로 했다.','reconcile');return '함께 문제를 풀며 다시 지내기로 마음을 모았다.';}return '대화를 더 이어가야 할 것 같다.';}


function chooseUnlockedSkill(p,cooldowns={}){const pool=skillsFor(p.starter,p.stage).filter(sk=>(cooldowns[sk.id]||0)<=0);if(!pool.length)return null;return pick(pool);}
function tickSkillCooldowns(obj){if(!obj)return;for(const k of Object.keys(obj))obj[k]=Math.max(0,(obj[k]||0)-1);}
function skillVoice(skill){return pick(skill?.lines||[]);}
function markAction(target,kind,payload={}){target.lastAction={id:Date.now()+Math.random(),kind,at:Date.now(),...payload};}
function applySkillToHunt(state,p,h,e,skill){const pass=ownedPassiveEffects(state),base=p.attack*(1+(pass.attack||0))*.78+p.intelligence*(1+(pass.intelligence||0))*.22;let dmg=Math.max(1,base*skill.power+rnd(-1,3)-e.def*.28);if(skill.kind==='heal'||skill.kind==='healHit'){h.hp=clamp(h.hp+(skill.kind==='heal'?11:5)+p.intelligence*.08,0,100);}if(skill.kind==='speed'||skill.kind==='gauge')h.field.pet.boostTicks=3;if(skill.kind==='slow')e.cooldown=(e.cooldown||0)+2;if(skill.kind==='guardHit'||skill.kind==='guardBurst')h.field.pet.guardTicks=2;if(skill.kind==='multi')dmg*=1.18;h.skillCooldowns[skill.id]=Math.max(2,5-skill.stage);e.hp-=dmg;state.codex.skills.push(skill.name);state.codex.skills=[...new Set(state.codex.skills)];const voice=skillVoice(skill);markAction(h,'skill',{name:skill.name,voice,sfx:skill.sfx,fx:skill.fx,power:dmg,targetX:e.x,targetY:e.y});return {dmg,voice};}
function huntZoneBounds(z){const dims={yard:[6.4,10.4],forest:[6.1,9.8],cave:[6.0,9.9],ruin:[6.0,9.8],lab:[6.3,10.4],deep:[6.0,10.2]}[z.id]||[6.2,10.0];return {minX:-dims[0]/2,maxX:dims[0]/2,minY:-dims[1]/2,maxY:dims[1]/2};}
function clampHuntPoint(z,x,y,margin=.18){const b=huntZoneBounds(z);return {x:clamp(x,b.minX+margin,b.maxX-margin),y:clamp(y,b.minY+margin,b.maxY-margin)};}
function applyBattleSkill(state,p,b,skill){const awaken=b.awakened?1.45:1,base=p.attack*(1+(b.passive?.attack||0))*.78+p.intelligence*(1+(b.passive?.intelligence||0))*.27;let dmg=Math.max(2,base*skill.power*awaken+rnd(-2,3)-b.enemyLevel*.28);if(b.enemyGuard){dmg*=1-b.enemyGuard;b.enemyGuard=0;}if(skill.kind==='heal'||skill.kind==='healHit')b.myHp=clamp(b.myHp+(skill.kind==='heal'?13:6)+p.intelligence*(1+(b.passive?.intelligence||0))*.18,0,b.myMax);if(skill.kind==='speed')b.status.speed={mult:1.42,turns:3};if(skill.kind==='gauge')b.myGauge=clamp(b.myGauge+38,0,100);if(skill.kind==='slow')b.enemyStatus.slow={mult:.68,turns:3};if(skill.kind==='guardHit'||skill.kind==='guardBurst')b.myGuard=Math.max(b.myGuard||0,skill.kind==='guardBurst'?.6:.42);if(skill.kind==='multi')dmg*=1.16;if(skill.kind==='heal')dmg*=.35;b.enemyHp=clamp(b.enemyHp-dmg,0,b.enemyMax);b.ult=clamp(b.ult+8+skill.stage*2,0,100);b.skillCooldowns[skill.id]=Math.max(1,4-skill.stage);state.codex.skills.push(skill.name);state.codex.skills=[...new Set(state.codex.skills)];checkCodexRewards(state);const voice=skillVoice(skill);markAction(b,'skill',{side:'player',name:skill.name,voice,sfx:skill.sfx,fx:skill.fx,power:dmg});return battleLog(b,`${p.name}: “${voice}” · ${skill.name}!${dmg>1?` ${Math.round(dmg)} 피해.`:''}`);}

function newHuntEnemy(z,boss=false,index=0,cx=0,cy=0,heading=null){
 const unlocked=huntEnemies;
 const base={...pick(unlocked)};
 const mult=(boss?3.7:0.78+z.danger*.17+Math.random()*.22);
 const anchor=Number.isFinite(heading)?heading:Math.random()*Math.PI*2;
 const spread=(Math.random()-.5)*(boss?.75:1.55),ang=anchor+spread,rad=boss?1.30:.82+Math.random()*.72;
 const spawn=clampHuntPoint(z,cx+Math.cos(ang)*rad,cy+Math.sin(ang)*rad,.24);return {...base,uid:`e${Date.now()}_${Math.random()}`,boss,maxHp:Math.round(base.hp*mult),hp:Math.round(base.hp*mult),x:spawn.x,y:spawn.y,nextAttackAt:0,special:0,flash:0,spawnIndex:index};
}
function huntPalette(z){return z.id==='yard'?['flowers','bush','tree','sign','rock','fence','well']:z.id==='forest'?['tree','bush','flowers','rock','bridge','cave']:z.id==='cave'?['rock','crystal','cave','lamp','chest']:z.id==='ruin'?['rock','gate','well','sign','fence','crystal']:z.id==='lab'?['tree','rock','flowers','sign','well','gate']:['crystal','gate','rock','cave','lamp','tree'];}
function seedWorldObject(z,x,y){return {id:`o${Math.random()}`,kind:pick(huntPalette(z)),x,y,scale:.70+Math.random()*.30,phase:Math.random()*10};}
function seedChest(z,x,y){return {id:`c${Math.random()}`,x,y,opened:false,rarity:Math.random()<.08+z.danger*.012?'rare':'common',glow:Math.random()*10};}
function ensureHuntField(h,z){
 let f=h.field||{};
 if(!Array.isArray(f.enemies))f.enemies=[];f.enemies=f.enemies.filter(e=>['spar','green_slime','mushroom','fox','golem','shadowbat','scarab','shellbug','firemage','minotaur','leafling','drone'].includes(e?.id));f.enemy=f.enemies[0]||null;
 if(!Array.isArray(f.objects))f.objects=[];
 if(!Array.isArray(f.chests))f.chests=[];
 if(!Array.isArray(f.drops))f.drops=[];f.drop=f.drops[0]||null;
 if(!f.pet||!Number.isFinite(f.pet.x))f.pet={x:0,y:0,state:'walk',dir:'right',boostTicks:0,guardTicks:0};
 if(!Number.isFinite(f.pet.x))f.pet.x=0;if(!Number.isFinite(f.pet.y))f.pet.y=0;
 if(!f.camera)f.camera={x:f.pet.x,y:f.pet.y};
 if(!Number.isFinite(f.distance))f.distance=0;if(!Number.isFinite(f.wave))f.wave=0;if(!Number.isFinite(f.bossMeter))f.bossMeter=0;
 if(!Number.isFinite(f.encounterCooldown))f.encounterCooldown=1;if(!Number.isFinite(f.nextChestDistance))f.nextChestDistance=f.distance+1.15+Math.random()*.95;
 if(!f.wanderTarget||!Number.isFinite(f.wanderTarget.x))f.wanderTarget=null;
 h.field=f;
 const spawnAround=(r0,r1)=>{const a=Math.random()*Math.PI*2,r=r0+Math.random()*(r1-r0);return clampHuntPoint(z,f.pet.x+Math.cos(a)*r,f.pet.y+Math.sin(a)*r,.26);};
 while(f.objects.length<9){const q=spawnAround(.75,2.65);f.objects.push(seedWorldObject(z,q.x,q.y));}
 while(f.chests.filter(c=>!c.opened).length<2){const q=spawnAround(1.15,2.7);f.chests.push(seedChest(z,q.x,q.y));}
 f.objects=f.objects.filter(o=>Math.hypot(o.x-f.pet.x,o.y-f.pet.y)<3.25).slice(-12);
 f.chests=f.chests.filter(c=>!c.opened&&Math.hypot(c.x-f.pet.x,c.y-f.pet.y)<4.0).slice(-3);
 return f;
}
function spawnEncounter(h,z,p){
 const f=h.field;f.wave++;
 const heading=Math.random()*Math.PI*2;
 const isBoss=f.bossMeter>=100||(!f.enemies.length&&h.kills>=6&&Math.random()<.055+z.danger*.012);
 if(isBoss){const e=newHuntEnemy(z,true,0,f.pet.x,f.pet.y,heading);e.name=`${z.name}의 ${['거대수호자','폭주대장','심층포식자'][Math.min(2,Math.floor(z.danger/3))]}`;f.enemies=[e];f.enemy=e;f.bossMeter=0;f.bossWarning=2;h.event=`⚠️ 주변에서 강한 기척! ${e.name}이 나타났다.`;markAction(h,'boss',{name:e.name,sfx:'battle',fx:'warning',targetX:e.x,targetY:e.y});return;}
 const maxCount=Math.min(6,2+Math.floor(z.danger/2)+Math.floor(Math.random()*3));
 const count=Math.max(1,Math.min(maxCount,(Math.random()<.56?2:1)+(Math.random()<.45?1:0)+(z.danger>=4&&Math.random()<.45?1:0)));
 f.enemies=[];for(let i=0;i<count;i++)f.enemies.push(newHuntEnemy(z,false,i,f.pet.x,f.pet.y,heading));f.enemy=f.enemies[0]||null;
 h.event=count>=4?`주변에서 몬스터 ${count}마리가 몰려온다!`:count>=2?`${f.enemies[0].name} 무리 ${count}마리를 발견했다.`:`${f.enemies[0].name}을 발견했다.`;
}
function pickHuntDrop(z){
 const summer=currentSeason().id==='summer',rr=Math.random();let rarity='common';
 if(rr<(.0007+(z.danger>=6?.0007:0)+(summer?.0002:0)))rarity='legendary';else if(rr<(.009+(z.danger>=5?.005:0)+(summer?.001:0)))rarity='epic';else if(rr<(.055+(z.danger>=4?.015:0)+(summer?.004:0)))rarity='rare';else if(rr<.28)rarity='uncommon';
 let candidates=Object.values(itemCatalog).filter(it=>it.rarity===rarity&&(!it.zone||it.zone===z.id));if(rarity==='common')candidates=[itemCatalog.material];if(rarity==='uncommon'&&!candidates.length)candidates=[itemCatalog.furniture_piece];if(rarity==='rare'&&!candidates.length)candidates=[itemCatalog.rare_decor];if(!candidates.length)candidates=[itemCatalog.material];const item=pick(candidates),meta=rarityMeta[rarity];return {kind:item.id,label:item.name,qty:1,rarity,rare:meta.rank>=2,sfx:meta.sfx,fx:meta.fx};
}
function openHuntChest(state,p,h,z,chest){const f=h.field,drop=pickHuntDrop(z);f.pet.celebrateUntil=Date.now()+850;if(chest.rarity==='rare'&&rarityMeta[drop.rarity].rank<2){drop.rarity='rare';drop.rare=true;drop.sfx=rarityMeta.rare.sfx;drop.fx=rarityMeta.rare.fx;drop.kind='rare_decor';drop.label='희귀 장식 조각';}state.inventory[drop.kind]=(state.inventory[drop.kind]||0)+drop.qty;h.items++;const meta=rarityMeta[drop.rarity];if(meta.rank>=2){h.rare++;p.rareFinds++;}h.lastLoot={id:Date.now()+Math.random(),...drop,rarityName:meta.name};markAction(h,'loot',{name:drop.label,rarity:drop.rarity,rarityName:meta.name,sfx:drop.sfx,fx:drop.fx});chest.opened=true;f.chests=f.chests.filter(c=>!c.opened);f.nextChestDistance=f.distance+1.7+Math.random()*1.8;h.event=meta.rank>=2?`상자에서 ${meta.name} ${drop.label}!`:`상자를 열어 ${drop.label}을 챙겼다.`;updateTitles(state);return h.event;}
function nearestThing(list,p){let best=null,bd=Infinity;for(const v of list){const d=Math.hypot(v.x-p.x,v.y-p.y);if(d<bd){bd=d;best=v;}}return [best,bd];}
function moveWorldPet(f,tx,ty,speed,z){const dx=tx-f.pet.x,dy=ty-f.pet.y,d=Math.hypot(dx,dy)||1;const step=Math.min(speed,d);let nx=f.pet.x+dx/d*step,ny=f.pet.y+dy/d*step;const clamped=clampHuntPoint(z,nx,ny,.78);f.pet.x=clamped.x;f.pet.y=clamped.y;f.distance+=step;f.pet.dir=Math.abs(dy)>Math.abs(dx)?(dy<0?'up':'down'):(dx<0?'left':'right');const lead=.12,camX=f.pet.x+dx/d*lead,camY=f.pet.y+dy/d*lead,cb=clampHuntPoint(z,camX,camY,.68);f.camera.x+=(cb.x-f.camera.x)*.16;f.camera.y+=(cb.y-f.camera.y)*.16;return d;}
function moveHuntEnemy(e,tx,ty,speed,z){const dx=tx-e.x,dy=ty-e.y,d=Math.hypot(dx,dy)||1,step=Math.min(speed,d),q=clampHuntPoint(z,e.x+dx/d*step,e.y+dy/d*step,.50);e.x=q.x;e.y=q.y;e.dir=Math.abs(dx)>=Math.abs(dy)?(dx<0?'left':'right'):(dy<0?'up':'down');return d;}
function failHunt(state,p,h,z){window.PetLife.cue(p,'faint',3500);h.failed=(h.failed||0)+1;p.fatigue=clamp(p.fatigue+9,0,100);p.condition=clamp(p.condition-6,0,100);markAction(h,'fail',{name:'사냥 실패',sfx:'error',fx:'hurt'});const msg=`사냥 실패 · ${p.name}이 지쳐서 안전하게 구조되어 돌아왔다.`;stopHunt(state,msg,true);return msg;}
function startHunt(state){const p=mainPet(state),z=zones.find(x=>x.id===state.hunt.zone);if(state.battle?.running)return {ok:false,msg:'배틀 중에는 자동사냥을 시작할 수 없어.'};if(state.exploration?.active)return {ok:false,msg:'산책 중에는 자동사냥을 시작할 수 없어. 먼저 집으로 돌아와.'};if(p.level<z.need)return {ok:false,msg:'아직 이 사냥터는 위험해.'};const hs=state.hunt.settings||(state.hunt.settings={});hs.hpReturn=Number(hs.hpReturn);if(!Number.isFinite(hs.hpReturn)||hs.hpReturn<5||hs.hpReturn>50)hs.hpReturn=20;else hs.hpReturn=clamp(hs.hpReturn,5,50);hs.hungerReturn=clamp(Number(hs.hungerReturn)||12,0,50);hs.conditionReturn=clamp(Number(hs.conditionReturn)||12,0,50);hs.maxMinutes=clamp(Number(hs.maxMinutes)||30,5,180);hs.targetItems=Math.max(0,Number(hs.targetItems)||0);hs.maxInventory=clamp(Number(hs.maxInventory)||30,5,Math.max(5,huntInventoryCapacity(state)));if(p.hunger<=hs.hungerReturn+5)return {ok:false,msg:`포만도가 안전귀환 기준(${hs.hungerReturn})에 너무 가까워. 먹이를 준 뒤 자동사냥을 시작해.`};if(p.condition<=hs.conditionReturn+5)return {ok:false,msg:`컨디션이 안전귀환 기준(${hs.conditionReturn})에 너무 가까워. 조금 쉬게 한 뒤 자동사냥을 시작해.`};if(state.stars<HUNT_ENTRY_COST)return {ok:false,msg:`자동사냥 출전에는 별 ${HUNT_ENTRY_COST}개가 필요해.`};const startedAt=Date.now();state.stars-=HUNT_ENTRY_COST;state.economy.totalSpent+=HUNT_ENTRY_COST;state.hunt={...state.hunt,petId:p.id,running:true,hp:100,kills:0,stars:0,items:0,rare:0,spent:HUNT_ENTRY_COST,upkeepPaid:0,startedAt,nextUpkeepAt:startedAt+HUNT_UPKEEP_MINUTES*60000,event:`${z.name} 입구에서 주변을 살피는 중`,skillCooldowns:{},lastAction:null,weather:pick(z.weather),timeOfDay:pick(['아침','낮','해질녘','밤']),field:{pet:{x:0,y:0,state:'walk',dir:'right',boostTicks:0,guardTicks:0},camera:{x:0,y:0},enemies:[],drops:[],objects:[],chests:[],distance:0,wave:0,bossMeter:0,encounterCooldown:2,bossWarning:0,wanderTarget:null,wanderUntil:0}};ensureHuntField(state.hunt,z);state.codex.zones.push(z.id);state.codex.zones=[...new Set(state.codex.zones)];return {ok:true,msg:`${z.name} 자동사냥 시작 · 별 ${HUNT_ENTRY_COST}개 사용.`};}
function stopHunt(state,reason='귀환했다.',failed=false){if(!state.hunt.running)return reason;state.hunt.running=false;const p=mainPet(state);if(!failed)p.exp+=state.hunt.kills*2;levelCheck(state,p);addMemory(state,`${zones.find(z=>z.id===state.hunt.zone)?.name||'사냥터'}에서 ${state.hunt.kills}마리를 처치하고 ${failed?'구조 귀환':'귀환'}했다.`,'hunt');state.hunt.lastAction=null;state.hunt.event='대기';state.hunt.field={pet:{x:0,y:0,state:'idle',dir:'right'},camera:{x:0,y:0},enemies:[],drops:[],objects:[],chests:[],distance:0,wave:0,bossMeter:0,encounterCooldown:2,bossWarning:0,wanderTarget:null,wanderUntil:0};return reason;}
function huntInventoryCount(state){return Object.values(state.inventory).reduce((s,v)=>s+(Number(v)||0),0);}
function huntTick(state){
 if(!state.hunt.running)return null;
 const p=mainPet(state),h=state.hunt,z=zones.find(x=>x.id===h.zone),f=ensureHuntField(h,z),now=Date.now(),pass=ownedPassiveEffects(state),tick=.25;
 tickSkillCooldowns(h.skillCooldowns);p.hunger=clamp(p.hunger-.11*tick*(1+(pass.hungerDrain||0)),0,100);p.fatigue=clamp(p.fatigue+.16*tick*(1+(pass.fatigueGain||0)),0,100);p.condition=clamp(p.condition-.055*tick*(1+(pass.conditionDrain||0)),0,100);
 while(now>=h.nextUpkeepAt){if(state.stars<HUNT_UPKEEP_COST)return stopHunt(state,`유지비 별 ${HUNT_UPKEEP_COST}개가 부족해 자동 귀환했다.`);state.stars-=HUNT_UPKEEP_COST;state.economy.totalSpent+=HUNT_UPKEEP_COST;h.spent=(h.spent||0)+HUNT_UPKEEP_COST;h.upkeepPaid=(h.upkeepPaid||0)+HUNT_UPKEEP_COST;h.nextUpkeepAt+=HUNT_UPKEEP_MINUTES*60000;}
 const min=(now-h.startedAt)/60000,runMs=now-h.startedAt;if(h.hp<=0)return failHunt(state,p,h,z);if(runMs>5000&&h.hp<=h.settings.hpReturn)return stopHunt(state,`사냥 HP가 안전귀환 기준 ${h.settings.hpReturn} 이하가 되어 귀환했다.`);if(p.hunger<=h.settings.hungerReturn)return stopHunt(state,`포만도가 안전귀환 기준 ${h.settings.hungerReturn} 이하가 되어 귀환했다.`);if(p.condition<=h.settings.conditionReturn)return stopHunt(state,`컨디션이 안전귀환 기준 ${h.settings.conditionReturn} 이하가 되어 귀환했다.`);if(min>=h.settings.maxMinutes)return stopHunt(state,`설정한 사냥 시간 ${h.settings.maxMinutes}분에 도달해 귀환했다.`);if(h.settings.targetItems>0&&h.items>=h.settings.targetItems)return stopHunt(state,`목표 아이템 ${h.settings.targetItems}개를 모아 귀환했다.`);if(h.items>=Math.min(h.settings.maxInventory,huntInventoryCapacity(state)))return stopHunt(state,'이번 사냥 가방이 가득 차 귀환했다.');
 ensureHuntField(h,z);
 if((f.pet.celebrateUntil||0)>now){f.pet.state='happy';f.pet.visualSnap=true;return h.event||'보물상자를 열고 기뻐한다.';}else f.pet.visualSnap=false;
 if(f.bossWarning>0){f.bossWarning=Math.max(0,f.bossWarning-tick);f.pet.state='observe';return h.event;}
 if(f.enemies.length){
  const alive=f.enemies.filter(e=>e.hp>0);f.enemies=alive;f.enemy=alive[0]||null;
  if(!alive.length){f.encounterCooldown=.8;f.pet.state='observe';return `${p.name}이 주변을 다시 살핀다.`;}
  const [target,dist]=nearestThing(alive,f.pet);f.pet.combatTargetX=target.x;f.pet.combatTargetY=target.y;f.pet.dir=Math.abs(target.y-f.pet.y)>Math.abs(target.x-f.pet.x)?(target.y<f.pet.y?'up':'down'):(target.x<f.pet.x?'left':'right');const moveStep=(.10+p.agility*(1+(pass.agility||0))*.0010)*tick;
  if(dist>.30){f.pet.state='chase';moveWorldPet(f,target.x,target.y,moveStep,z);for(const e of alive){const d=Math.hypot(e.x-f.pet.x,e.y-f.pet.y);if(d<1.25){const sp=(e.speed||4)*.006*tick;moveHuntEnemy(e,f.pet.x,f.pet.y,sp,z);}}h.event=`${alive.length}마리와 교전 중 · ${target.name}에게 접근`;return h.event;}
  let attacked=false;
  if(now>=(f.nextPlayerAttackAt||0)){
   f.pet.state='attack';f.attackPoseUntil=now+330;f.nextPlayerAttackAt=now+920;attacked=true;
   const unlocked=skillsFor(p.starter,p.stage),skillChance=clamp(.26+unlocked.length*.05+p.intelligence/560,.25,.55);let dmg=0;
   if(unlocked.length&&Math.random()<skillChance){const sk=chooseUnlockedSkill(p,h.skillCooldowns);if(sk){const r=applySkillToHunt(state,p,h,target,sk);dmg=r.dmg;h.event=`${p.name}: ${sk.name}!`;}}
   if(!dmg){dmg=Math.max(1,p.attack*(1+(pass.attack||0))*.80+rnd(-2,3)-target.def*.34);target.hp-=dmg;target.hitPoseUntil=now+300;markAction(h,'attack',{name:'기본 공격',sfx:'hit',fx:'slash',power:dmg,targetX:target.x,targetY:target.y});}else target.hitPoseUntil=now+300;
   if(target.hp<=0){h.kills++;p.huntKills++;f.bossMeter+=target.boss?0:9+z.danger*2;p.exp+=target.boss?2.2:.35*(1+(pass.huntXp||0));const deathX=target.x,deathY=target.y;f.enemies=f.enemies.filter(e=>e!==target);f.enemy=f.enemies[0]||null;f.nextPlayerAttackAt=now+500;
    if(target.boss){h.event=`보스 ${target.name} 격파! 주변이 조용해졌다.`;markAction(h,'bossWin',{name:target.name,sfx:'rare',fx:'star',targetX:deathX,targetY:deathY});const d=pickHuntDrop(z);d.rarity=rarityMeta[d.rarity].rank<2?'rare':d.rarity;d.rare=true;f.drops.push({...d,x:deathX,y:deathY});f.drop=f.drops[0]||null;}
    else{h.event=`${target.name} 처치 · 남은 적 ${f.enemies.length}`;if(Math.random()<.22+.02*z.danger){const d=pickHuntDrop(z);f.drops.push({...d,x:deathX,y:deathY});f.drop=f.drops[0]||null;}}
    const starProgress=.036*z.reward*(currentSeason().id==='summer'?1.05:1);state.economy.huntProgress+=starProgress;if(state.economy.huntProgress>=1&&state.daily.huntStars<5){const grant=Math.min(Math.floor(state.economy.huntProgress),5-state.daily.huntStars);state.economy.huntProgress-=grant;state.stars+=grant;h.stars+=grant;state.daily.huntStars+=grant;state.economy.totalEarned+=grant;}return h.event;
   }
  } else f.pet.state=now<(f.attackPoseUntil||0)?'attack':'engage';
  let incoming=0;for(const e of alive){if(e.hp<=0)continue;const d=Math.hypot(e.x-f.pet.x,e.y-f.pet.y),ranged=e.role==='ranged';if(d<(ranged?1.02:.38)){if(now<(e.nextAttackAt||0))continue;e.nextAttackAt=now+(ranged?1250:980)+(Math.random()*220);e.attackPoseUntil=now+430;e.dir=f.pet.x<e.x?'left':'right';if(e.boss){e.special=(e.special||0)+1;if(e.special%3===0){incoming+=Math.max(2,e.atk*z.danger*.52);markAction(h,'bossAttack',{name:'보스 범위공격',sfx:'battle',fx:'warning',targetX:f.pet.x,targetY:f.pet.y});continue;}}if(Math.random()>(.05+p.agility/460))incoming+=Math.max(1,e.atk*z.danger*.24-p.defense*(1+(pass.defense||0))*.07);else f.pet.dodgeUntil=now+570;}else{const sp=(e.speed||4)*.008*tick;moveHuntEnemy(e,f.pet.x,f.pet.y,sp,z);}}
  if(incoming>0){if(f.pet.guardTicks>0){incoming*=.55;f.pet.guardTicks--;}h.hp=clamp(h.hp-incoming,0,100);f.pet.hurtUntil=now+380;f.pet.state='hurt';markAction(h,'hurt',{name:alive.length>2?'포위 공격':'피격',sfx:'hit',fx:'hurt',power:incoming,targetX:f.pet.x,targetY:f.pet.y});h.event=alive.length>=4?`몬스터들에게 둘러싸였다! HP -${Math.round(incoming)}`:`반격을 받았다. HP -${Math.round(incoming)}`;}
  return attacked?h.event:(h.event||`${target.name}과 대치 중`);
 }
 if(f.drops.length){const [d,dist]=nearestThing(f.drops,f.pet);if(dist>.13){f.pet.state='walk';moveWorldPet(f,d.x,d.y,.12*tick,z);h.event='반짝이는 전리품을 향해 간다.';return h.event;}state.inventory[d.kind]=(state.inventory[d.kind]||0)+d.qty;h.items++;const meta=rarityMeta[d.rarity||'common'];if(meta.rank>=2){h.rare++;p.rareFinds++;}h.lastLoot={id:Date.now()+Math.random(),...d,rarityName:meta.name};markAction(h,'loot',{name:d.label,rarity:d.rarity,rarityName:meta.name,sfx:d.sfx||meta.sfx,fx:d.fx||meta.fx,targetX:d.x,targetY:d.y});f.drops=f.drops.filter(v=>v!==d);f.drop=f.drops[0]||null;h.event=`${meta.name} ${d.label} 획득!`;updateTitles(state);return h.event;}
 const unopened=f.chests.filter(c=>!c.opened);const [chest,cd]=nearestThing(unopened,f.pet),chestDue=f.distance>=f.nextChestDistance;if(chest&&chestDue&&cd<2.35){if(cd>.14){f.pet.state='walk';f.pet.celebrateUntil=0;moveWorldPet(f,chest.x,chest.y,.10*tick,z);if(!chest.discoveredAt){chest.discoveredAt=now;markAction(h,'discover',{name:chest.rarity==='rare'?'빛나는 보물상자!':'보물상자 발견!',sfx:'item',fx:'star',targetX:chest.x,targetY:chest.y});}h.event=chest.rarity==='rare'?'빛나는 상자를 발견했다!':'탐색 중 보물상자를 발견했다.';return h.event;}if(!chest.inspectUntil){chest.inspectUntil=now+520;f.pet.state='inspect';f.pet.dir=chest.x<f.pet.x?'left':'right';h.event='상자를 살펴보는 중...';return h.event;}if(now<chest.inspectUntil){f.pet.state='inspect';return h.event;}f.pet.state='interact';return openHuntChest(state,p,h,z,chest);}
 f.encounterCooldown-=tick;if(f.encounterCooldown<=0){spawnEncounter(h,z,p);f.encounterCooldown=2.5+Math.random()*2.0;return h.event;}
 f.pet.state=p.condition<28?'rest':'wander';if(f.pet.state==='rest'){h.hp=clamp(h.hp+2*tick,0,100);h.event='잠깐 숨을 고르며 주변 소리를 듣는다.';return h.event;}
 if(!f.wanderTarget||Math.hypot(f.wanderTarget.x-f.pet.x,f.wanderTarget.y-f.pet.y)<.16||now>=(f.wanderUntil||0)){
  const a=Math.random()*Math.PI*2,r=.8+Math.random()*1.25;f.wanderTarget=clampHuntPoint(z,f.pet.x+Math.cos(a)*r,f.pet.y+Math.sin(a)*r,.26);f.wanderUntil=now+2200+Math.random()*2600;
 }
 moveWorldPet(f,f.wanderTarget.x,f.wanderTarget.y,.12*tick,z);ensureHuntField(h,z);h.event=pick([`${z.name} 곳곳을 자유롭게 돌아본다.`,`${h.weather} 속에서 주변 지형을 살피며 탐색한다.`,`${Math.round(f.distance*10)}m쯤 자유 탐색했다. 새로운 흔적을 찾는다.`]);return h.event;
}
function huntIntervention(state,type){const p=mainPet(state),h=state.hunt;if(!h.running)return '사냥 중이 아니야.';if(type==='cheer'){h.hp=clamp(h.hp+3+p.bond/50,0,100);p.mood=clamp(p.mood+2,0,100);return '응원을 듣고 다시 힘을 낸다.';}if(type==='snack'){if((state.inventory.apple||0)<=0)return '간식이 없어.';state.inventory.apple--;p.hunger=clamp(p.hunger+15,0,100);return '간식을 먹고 다시 움직인다.';}if(type==='heal'){h.hp=clamp(h.hp+18,0,100);return '잠깐 쉬며 체력을 회복했다.';}if(type==='rest'){const pass=ownedPassiveEffects(state),rm=1+(pass.restEfficiency||0);p.condition=clamp(p.condition+4*(1+(pass.recovery||0)),0,100);p.fatigue=clamp(p.fatigue-8*rm,0,100);h.field.pet.state='rest';return '바위 옆에 앉아 잠깐 쉬었다.';}if(type==='target'){h.settings.targetEnemy=h.settings.targetEnemy==='auto'?'strong':'auto';return `공격 우선순위: ${h.settings.targetEnemy==='strong'?'강한 적 우선':'자동'}`;}return '';}

const WALK_DURATION_MS=180000;
const walkSceneLines=['햇살이 드는 길을 천천히 걷고 있어.','화단 옆에서 잠깐 냄새를 맡아 본다.','나뭇잎이 흔들리는 쪽을 바라본다.','벤치 옆을 지나며 주변을 구경한다.','골목 모퉁이를 돌아 새로운 길로 간다.','작은 새를 발견하고 잠시 걸음을 늦춘다.'];
function walkFriendDialogue(p,friendStage){const mine=Number(p.stage||0);if(friendStage>mine)return pick(['조금 더 자라면 새로운 게 많이 보여. 천천히 와!','나도 네 단계일 때 산책을 정말 좋아했어.','서두르지 않아도 돼. 걷다 보면 자연스럽게 자라.']);if(friendStage<mine)return pick(['우와, 나도 그렇게 자라고 싶어!','산책길에서 또 만나면 같이 걸어 줘!','어떻게 그렇게 자랐어? 멋지다!']);return pick(['우리 같은 단계네! 오늘은 어디까지 걸어봤어?','다음 모퉁이까지 같이 가 볼래?','산책하다 친구를 만나니까 반갑다!']);}
function walkPlayerReply(p,friendStage){const mine=Number(p.stage||0);if(friendStage>mine)return pick(['응! 나도 천천히 많이 걸어볼래.','다음에 만나면 나도 더 자라 있을 거야!','알려줘서 고마워. 오늘도 열심히 걸어볼게!']);if(friendStage<mine)return pick(['물론이지! 다음에 만나면 같이 걷자.','나도 처음엔 천천히 자랐어. 같이 힘내자!','고마워! 산책하다 또 만나자.']);return pick(['좋아! 다음 모퉁이까지 같이 가자.','나도 반가워! 오늘 길이 정말 좋다.','응! 우리 다음에도 여기서 만나자.']);}
function startExploration(state,id='walk'){
 const p=mainPet(state);if(state.hunt?.running)return {ok:false,msg:'자동사냥 중에는 산책할 수 없어. 먼저 귀환해.'};if(state.battle?.running)return {ok:false,msg:'배틀 중에는 산책할 수 없어.'};
 if(state.exploration.active?.kind==='walk')return {ok:true,msg:'걷던 산책을 이어서 시작해.'};
 state.exploration.active={kind:'walk',route:'walk',progressMs:0,durationMs:WALK_DURATION_MS,nextEventAtMs:16000+rnd(0,14000),event:null,eventUntilMs:0,eventCount:0,xpEarned:0,evolutionGain:0,distance:0,gifts:[],log:[{t:Date.now(),text:'문을 열고 산책을 시작했어.'}]};
 window.PetLife.action?.(p,'play');return {ok:true,msg:'3분 산책을 시작했어. 이 화면을 보고 있을 때만 시간이 흘러.'};
}
function cancelExploration(state,reason='산책을 마치고 집으로 돌아왔어.'){
 const a=state.exploration.active;if(!a)return reason;if(a.kind==='walk'&&a.progressMs>0){const p=mainPet(state);addMemory(state,`산책을 ${Math.max(1,Math.round(a.distance))}m 걷다가 집으로 돌아왔다.`,'walk',p);}state.exploration.active=null;return reason;
}
function makeWalkEvent(state){
 const a=state.exploration.active,p=mainPet(state);if(!a||a.kind!=='walk')return null;const friendChance=.38;let ev;
 if(Math.random()<friendChance){const st=pick(starters),stage=pick([0,1,2,3,4].filter(v=>v!==Number(p.stage||0))),giftRoll=Math.random(),gift=giftRoll<.16?pick(['apple','banana','milk','nuts']):null;ev={id:`friend-${Date.now()}-${rnd(100,999)}`,kind:'friend',title:`${stage}단계 ${st.name}`,text:walkFriendDialogue(p,stage),reply:walkPlayerReply(p,stage),starter:st.id,name:st.name,stage};
  if(gift){state.inventory[gift]=(state.inventory[gift]||0)+1;const it=shops.find(x=>x.id===gift);ev.gift=gift;ev.giftName=it?.name||gift;a.gifts.push(gift);}
  p.bond=clamp(p.bond+.35,0,100);p.mood=clamp(p.mood+1.2,0,100);
 }else{const text=pick(walkSceneLines);ev={id:`scene-${Date.now()}-${rnd(100,999)}`,kind:'scene',title:pick(['산책길 발견','잠깐 멈춤','길 위의 작은 일']),text};if(Math.random()<.28){const bonus=.025;addPermanentStat(p,'evolution',bonus);a.evolutionGain+=bonus;ev.text+=' 새로운 경험이 성장에 조금 도움이 됐어.';}}
 ev.startedAtMs=a.progressMs;a.event=ev;a.eventCount++;a.eventUntilMs=a.progressMs+(ev.kind==='friend'?10800:5200);a.log.unshift({t:Date.now(),text:`${ev.title} · ${ev.text}${ev.giftName?` · ${ev.giftName} 선물`:''}`});a.log=a.log.slice(0,6);a.nextEventAtMs=a.progressMs+18000+rnd(0,15000);return ev;
}
function walkTick(state,deltaMs){
 const a=state.exploration.active;if(!a||a.kind!=='walk')return null;const p=mainPet(state),dt=clamp(Number(deltaMs)||0,0,1000);if(dt<=0)return null;a.progressMs=Math.min(a.durationMs,a.progressMs+dt);const sec=dt/1000,move=sec*(1.25+p.agility/180);a.distance+=move;const xp=sec*.05,evo=sec*.0007;p.exp+=xp;addPermanentStat(p,'evolution',evo);a.xpEarned+=xp;a.evolutionGain+=evo;
 if(a.event&&a.progressMs>=a.eventUntilMs)a.event=null;if(a.progressMs>=a.nextEventAtMs)makeWalkEvent(state);levelCheck(state,p);return a.progressMs>=a.durationMs?finishExploration(state,true):null;
}
function finishExploration(state,force=false){
 const a=state.exploration.active;if(!a||a.kind!=='walk')return {ok:false,msg:'진행 중인 산책이 없어.'};if(!force&&a.progressMs<a.durationMs)return {ok:false,msg:'아직 산책 중이야.'};const p=mainPet(state);p.explorationCount++;p.mood=clamp(p.mood+3,0,100);p.bond=clamp(p.bond+1,0,100);p.exp+=3;levelCheck(state,p);state.codex.exploration.push('walk');state.codex.exploration=[...new Set(state.codex.exploration)];state.exploration.completed.push({t:Date.now(),route:'walk',distance:Math.round(a.distance),xp:a.xpEarned,evolution:a.evolutionGain,gifts:[...a.gifts]});state.exploration.completed=state.exploration.completed.slice(-40);const giftText=a.gifts.length?` · 선물 ${a.gifts.length}개`:'';addMemory(state,`3분 산책을 마쳤다. ${Math.round(a.distance)}m · 성장 경험치 ${a.xpEarned.toFixed(1)} · 진화 성장 ${a.evolutionGain.toFixed(2)}${giftText}`,'walk',p);state.exploration.active=null;updateTitles(state);return {ok:true,msg:`산책 완료! ${Math.round(a.distance)}m 걸었어 · 성장 경험치 +${a.xpEarned.toFixed(1)}${giftText}`};
}

function cancelBattle(state,reason='배틀을 중단했다.'){if(!state.battle?.running)return reason;state.battle.running=false;state.battle.lastAction=null;state.battle.tempEvolution=null;state.battle.tempEvolutionFxUntil=0;return reason;}
function chooseBattleEnemyForLevel(level,preferredId=''){const pool=battleEnemies.filter(e=>!e.minLevel||level>=e.minLevel);const earlyPool=pool.filter(e=>!['spiderqueen','firedragon'].includes(e.id));const source=level<12&&earlyPool.length?earlyPool:pool;const preferred=preferredId?source.find(e=>e.id===preferredId):null;return preferred||pick(source)||battleEnemies[0];}
function startBattle(state){const p=mainPet(state),pass=ownedPassiveEffects(state);if(state.hunt?.running)return {ok:false,msg:'자동사냥 중에는 배틀을 시작할 수 없어. 먼저 귀환해.'};if(state.exploration?.active)return {ok:false,msg:'탐험 중에는 배틀을 시작할 수 없어.'};if(state.battle.running)return {ok:false,msg:'이미 전투 중이야.'};const archetype=chooseBattleEnemyForLevel(p.level,state.battle?.enemyId||''),enemyLevel=Math.max(1,p.level+rnd(-1,3)+(archetype.id==='firedragon'?2:archetype.id==='spiderqueen'?1:0)),enemyMax=Math.round((70+enemyLevel*10)*(archetype.type==='guard'?1.18:1)*(archetype.id==='firedragon'?1.12:archetype.id==='spiderqueen'?1.08:1));state.battle={petId:p.id,running:true,passive:pass,enemyLevel,enemyId:archetype.id,enemyName:archetype.name,enemyType:archetype.type,enemyHp:enemyMax,enemyMax,myHp:p.hp*2.25,myMax:p.hp*2.25,myGauge:0,enemyGauge:0,ult:0,awaken:0,awakened:false,awakenTurns:0,tempEvolution:null,tempEvolvedOnce:false,tempEvolutionFxUntil:0,streak:0,startedAt:Date.now(),lastQuizAt:Date.now(),score:0,enemyGuard:0,myGuard:0,status:{},enemyStatus:{},skillCooldowns:{},lastAction:null,turn:0,logs:[]};return {ok:true,msg:`${archetype.name} Lv.${enemyLevel}와 전투 시작.`};}
function predictedWinRate(state){const p=mainPet(state),b=state.battle,enemy=b.running?b.enemyLevel:p.level+1;const me=p.level*2+p.attack*1.1+p.defense+p.hp*.25+p.agility+p.intelligence+p.evolution*.7+p.bond*.06+p.condition*.04+p.stage*4;const foe=enemy*7+35;return clamp(Math.round(50+(me-foe)*1.15),0,100);}
function battleLog(b,text){b.logs.unshift(text);b.logs=b.logs.slice(0,8);return text;}
function tickStatuses(b){for(const [key,val] of Object.entries(b.status)){if(val.turns!==undefined&&--val.turns<=0)delete b.status[key];}for(const [key,val] of Object.entries(b.enemyStatus)){if(val.turns!==undefined&&--val.turns<=0)delete b.enemyStatus[key];}}
function battleTick(state){const b=state.battle,p=mainPet(state);if(!b.running)return null;if((b.awakenFxUntil&&Date.now()<b.awakenFxUntil)||(b.tempEvolutionFxUntil&&Date.now()<b.tempEvolutionFxUntil))return null;if(b.tempEvolution&&Date.now()>=b.tempEvolution.until){const form=starters.find(x=>x.id===b.tempEvolution.starter);b.tempEvolution=null;b.skillCooldowns={};battleLog(b,`${form?.name||'임시 진화'}의 힘이 사라져 꼬물이 모습으로 돌아왔다.`);}b.turn++;tickStatuses(b);tickSkillCooldowns(b.skillCooldowns);const speedBuff=b.status.speed?.mult||1,slow=b.status.slow?.mult||1;b.myGauge+=8*(1+p.agility/35)*speedBuff*slow*(1+(b.passive?.battleGauge||0)+(b.passive?.agility||0));b.enemyGauge+=8*(1+b.enemyLevel/45)*(b.enemyStatus.slow?.mult||1);let log=null;if(b.myGauge>=100){b.myGauge-=100;log=playerBattleAction(state);}if(b.running&&b.enemyGauge>=100){b.enemyGauge-=100;log=enemyBattleAction(state)||log;}if(b.awakened){b.awakenTurns--;if(b.awakenTurns<=0){b.awakened=false;log=battleLog(b,'각성 시간이 끝나 3단계 모습으로 돌아왔다.');}}if(b.enemyHp<=0)return endBattle(state,true);if(b.myHp<=0)return endBattle(state,false);return log;}
function choosePlayerAction(p,b){const hpRate=b.myHp/b.myMax,r=Math.random(),skillRate=.24+p.stage*.09;if(b.ult>=100)return 'ult';if(p.starter==='kind'&&hpRate<.48&&r<.42)return 'skill';if(p.starter==='careful'&&hpRate<.48&&r<.22)return 'guard';if(p.primary==='용감함'&&hpRate<.35&&r<.58)return 'skill';if(p.primary==='신중함'&&r<.18)return 'guard';if(r<skillRate)return 'skill';return r<skillRate+.12?'guard':'attack';}
function playerBattleAction(state){const b=state.battle,p=mainPet(state),temp=b.tempEvolution,combatPet=temp?{...p,starter:temp.starter,stage:1,attack:p.attack*1.12,defense:p.defense*1.08,agility:p.agility*1.10,intelligence:p.intelligence*1.10}:p,s=starterOf(combatPet),action=choosePlayerAction(combatPet,b),awaken=(b.awakened?1.45:1)*(temp?1.08:1);if(action==='guard'){b.myGuard=.5+(p.starter==='careful'?.1:0);markAction(b,'guard',{side:'player',name:'방어',sfx:'skill_guard',fx:'guard'});return battleLog(b,`${p.name}이 상대 움직임을 읽고 방어 자세를 잡는다.`);}if(action==='skill'){const sk=chooseUnlockedSkill(combatPet,b.skillCooldowns);if(sk)return applyBattleSkill(state,combatPet,b,sk);}if(action==='ult'){p.ultUses++;b.ult=0;let name=b.awakened?s.awakenUlt:s.ult;markAction(b,'ult',{side:'player',name,voice:pick(['지금이야!','끝까지 간다!','이걸로 마무리!']),sfx:'ultimate',fx:b.awakened?'awakenUlt':'ultimate'});state.codex.ultimates.push(name);state.codex.ultimates=[...new Set(state.codex.ultimates)];checkCodexRewards(state);if(combatPet.starter==='kind'){const heal=20+p.intelligence*(1+(b.passive?.intelligence||0))*.5;b.myHp=clamp(b.myHp+heal,0,b.myMax);const dmg=Math.max(3,combatPet.attack*(1+(b.passive?.attack||0))*1.3-b.enemyLevel*.25);b.enemyHp=clamp(b.enemyHp-dmg,0,b.enemyMax);return battleLog(b,`${name}! 회복과 공격을 동시에 펼친다.`);}if(combatPet.starter==='careful'){b.myGuard=.75;b.enemyStatus.slow={mult:.55,turns:3};const dmg=Math.max(3,combatPet.defense*(1+(b.passive?.defense||0))*1.4-b.enemyLevel*.2);b.enemyHp=clamp(b.enemyHp-dmg,0,b.enemyMax);return battleLog(b,`${name}! 거대한 장벽이 전장을 지배한다.`);}if(combatPet.starter==='active')b.status.speed={mult:1.55,turns:4};if(combatPet.starter==='wise')b.enemyStatus.slow={mult:.55,turns:3};const mult={brave:3.15,wise:2.55,active:2.35,free:2.65}[combatPet.starter]||2.7;const dmg=Math.max(4,(combatPet.attack*(1+(b.passive?.attack||0))*1.15+combatPet.intelligence*(1+(b.passive?.intelligence||0))*.22+rnd(-2,4))*mult*awaken-b.enemyLevel*.28);b.enemyHp=clamp(b.enemyHp-dmg,0,b.enemyMax);return battleLog(b,`${name}! ${Math.round(dmg)}의 큰 피해!`);}const dmg=Math.max(2,(combatPet.attack*1.05*(1+(b.passive?.attack||0))+rnd(-2,3))*awaken-b.enemyLevel*.35);markAction(b,'attack',{side:'player',name:'기본 공격',sfx:'hit',fx:'slash',power:dmg});b.enemyHp=clamp(b.enemyHp-dmg,0,b.enemyMax);b.ult=clamp(b.ult+8,0,100);return battleLog(b,p.primary==='경쟁적'?`${p.name}이 선두를 빼앗듯 빠르게 파고든다!`:`${p.name}이 빈틈을 노려 공격했다.`);}
function enemyBattleFx(enemy,action='attack'){if(action==='guard')return {fx:enemy.type==='guard'?'earth':'guard',sfx:enemy.type==='guard'?'skill_earth':'skill_guard'};if(action!=='skill'){if(enemy.id==='golem'||enemy.id==='minotaur'||enemy.id==='shellbug')return {fx:'earth',sfx:'skill_earth'};if(enemy.id==='fox'||enemy.id==='shadowbat')return {fx:'dash',sfx:'skill_wind'};if(enemy.id==='firemage')return {fx:'fire',sfx:'skill_fire'};if(enemy.id==='drone')return {fx:'beam',sfx:'skill_beam'};return {fx:'slash',sfx:'hit'};}if(enemy.id==='firemage')return {fx:'fireBurst',sfx:'skill_fire_heavy'};if(enemy.id==='drone')return {fx:'beam',sfx:'skill_beam'};if(enemy.id==='fox'||enemy.id==='shadowbat')return {fx:'cyclone',sfx:'skill_wind'};if(enemy.id==='golem'||enemy.id==='shellbug')return {fx:'forestWave',sfx:'skill_earth'};if(enemy.id==='mushroom')return {fx:'orbit',sfx:'skill_magic'};if(enemy.id==='leafling')return {fx:'star',sfx:'skill_magic'};if(enemy.id==='scarab'||enemy.id==='minotaur')return {fx:'fireBurst',sfx:'skill_combo'};return enemy.type==='smart'?{fx:'prism',sfx:'skill_magic'}:enemy.type==='speed'?{fx:'dash',sfx:'skill_wind'}:enemy.type==='guard'?{fx:'earth',sfx:'skill_guard'}:enemy.type==='burst'?{fx:'fireBurst',sfx:'skill_combo'}:{fx:'slash',sfx:'hit'};}
function enemyBattleAction(state){const b=state.battle,p=mainPet(state),e=battleEnemies.find(x=>x.id===b.enemyId)||battleEnemies[0];if(Math.random()<clamp(.05+p.agility*(1+(b.passive?.agility||0))/320,0,.25))return battleLog(b,`${p.name}이 ${b.enemyName}의 공격을 피했다!`);const weights={...e.bias};if(b.enemyHp/b.enemyMax<.35&&e.type==='guard')weights.guard+=4;if(b.myHp/b.myMax<.4&&e.type==='burst')weights.skill+=4;const actions=[];for(const [a,w] of Object.entries(weights))for(let i=0;i<w;i++)actions.push(a);const action=pick(actions);if(action==='guard'){b.enemyGuard=.5;const fx=enemyBattleFx(e,'guard');markAction(b,'guard',{side:'enemy',name:'방어',sfx:fx.sfx,fx:fx.fx});return battleLog(b,`${b.enemyName}이 몸을 웅크려 다음 공격을 막으려 한다.`);}let dmg=Math.max(1,(8+b.enemyLevel*1.55+(action==='skill'?4+b.enemyLevel*.45:0))-p.defense*.22*(1+(b.passive?.defense||0)));if(b.myGuard){dmg*=1-b.myGuard;b.myGuard=0;}if(action==='skill'&&e.type==='smart')b.status.slow={mult:.78,turns:2};if(action==='skill'&&e.type==='speed')b.enemyGauge+=25;if(action==='skill'&&e.type==='burst'&&Math.random()<.25)dmg*=1.35;const fx=enemyBattleFx(e,action==='skill'?'skill':'attack');if(dmg>=b.myHp&&p.bond>=88&&!b.status.bondSave&&Math.random()<.18){b.status.bondSave={turns:99};b.myHp=1;markAction(b,'skill',{side:'enemy',name:`${b.enemyName}의 맹공`,power:dmg,sfx:fx.sfx,fx:fx.fx});return battleLog(b,`${p.name}이 함께한 기억을 떠올리며 HP 1로 버텼다!`);}b.myHp=clamp(b.myHp-dmg,0,b.myMax);markAction(b,action==='skill'?'skill':'attack',{side:'enemy',name:action==='skill'?`${b.enemyName} 특수기`:`${b.enemyName} 공격`,power:dmg,sfx:fx.sfx,fx:fx.fx});return battleLog(b,action==='skill'?`${b.enemyName}의 특수 기술! ${Math.round(dmg)} 피해.`:`${b.enemyName}이 반격했다.`);}
function answerBattle(state,quiz,value){const b=state.battle,p=mainPet(state);if(!b.running)return {ok:false,msg:'전투 중이 아니야.'};const ok=Math.abs(Number(value)-quiz.ans)<.0001;if(ok){const elapsed=(Date.now()-quiz.createdAt)/1000,mult=difficulties[quiz.difficulty]||1,fast=elapsed<5?1.12:1;b.streak++;b.ult=clamp(b.ult+15*mult*fast,0,100);b.awaken=clamp(b.awaken+13*mult*fast,0,100);b.myHp=clamp(b.myHp+4.5*mult,0,b.myMax);let msg=battleLog(b,elapsed<5?'빠른 정답! 흐름을 끌어오며 게이지가 크게 오른다.':'정답! 체력과 필살기/각성 게이지가 올랐다.');if(p.stage===0&&!b.tempEvolvedOnce&&!b.tempEvolution&&b.streak>=3){const form=pick(starters);b.tempEvolution={stage:1,starter:form.id,species:form.species,name:form.name,startedAt:Date.now(),until:Date.now()+10000};b.tempEvolvedOnce=true;b.tempEvolutionFxUntil=Date.now()+1600;b.skillCooldowns={};b.myGauge=clamp(b.myGauge+28,0,100);b.ult=clamp(b.ult+20,0,100);markAction(b,'skill',{side:'player',name:`임시진화 · ${form.name}`,sfx:'evolution',fx:'prism'});msg=battleLog(b,`3연속 정답! 꼬물이가 ${form.species} ${form.name}(으)로 임시진화했다! 10초 동안 1단계 기술을 사용한다.`);}if(b.streak%5===0&&p.stage===3&&!b.awakened){const losing=b.myHp/b.myMax<b.enemyHp/b.enemyMax,chance=clamp(.25+p.evolution/180+p.bond/350+(losing?.16:0)+(b.myHp/b.myMax<.35?.12:0),.2,.85);if(Math.random()<chance){b.awakened=true;b.awakenTurns=8+Math.floor(p.evolution/20);b.awaken=100;b.awakenFxUntil=Date.now()+1800;if(!p.firstAwaken)p.firstAwaken=Date.now();state.codex.awaken=true;addMemory(state,'처음으로 4단계 배틀 각성에 성공했다.','awaken');updateTitles(state);msg=battleLog(b,'5연속 정답! 4단계 배틀 각성에 성공했다!');}else msg=battleLog(b,'5연속 정답! 각성의 기운이 강해졌지만 이번에는 변하지 않았다.');}return {ok:true,msg};}b.streak=0;return {ok:false,msg:battleLog(b,`오답. 정답은 ${quiz.ans}. 직접 피해는 없다.`)};}
function endBattle(state,win){const b=state.battle,p=mainPet(state);b.running=false;window.PetLife.action(p,win?'win':'loss');b.outcome=win?'victory':'defeat';b.endedAt=Date.now();b.tempEvolution=null;b.tempEvolutionFxUntil=0;p.battles++;state.daily.battle++;if(win){p.wins++;p.winStreak++;p.bestWinStreak=Math.max(p.bestWinStreak,p.winStreak);const desired=1+(b.enemyLevel>p.level?1:0),gain=Math.max(0,Math.min(desired,4-state.daily.battleStars));if(gain){state.stars+=gain;state.daily.battleStars+=gain;state.economy.totalEarned+=gain;}p.exp+=8+b.enemyLevel*2;levelCheck(state,p);const lootMap={balanced:'forest_fiber',guard:'iron_band',speed:'lucky_feather',smart:'sage_lens',burst:'ember_core'};const lootId=lootMap[b.enemyType]||'material',lootQty=Math.random()<.18?2:1;state.inventory[lootId]=(state.inventory[lootId]||0)+lootQty;if(p.battles===1)addMemory(state,'첫 배틀에서 승리했다.','first-win');if(p.winStreak===10)addMemory(state,'처음으로 10연승을 달성했다.','battle');updateTitles(state);b.awakened=false;generateDiary(state,true);return battleLog(b,`${petDialogue(p,'win')}${gain?` · 별 +${gain}`:''} · 전리품 ${itemCatalog[lootId]?.name||lootId} x${lootQty}`);}p.winStreak=0;p.mood=clamp(p.mood-(p.primary==='낙천적'?2:5),0,100);if(p.battles===1)addMemory(state,'첫 배틀을 끝까지 치렀다. 다음 전투를 위한 경험이 되었다.','first-loss');b.awakened=false;generateDiary(state,true);return battleLog(b,petDialogue(p,'loss'));}

function computeScores(state){const p=mainPet(state);if(!p)return {growth:0,study:0,battle:0,daily:0,total:0,grade:'새싹',petGrade:'C'};const vals=[p.attack,p.defense,p.hp/2,p.agility,p.intelligence,p.evolution],avg=vals.reduce((a,b)=>a+b,0)/vals.length,spread=Math.max(...vals)-Math.min(...vals);const growth=Math.round(p.level*12+avg*10+p.stage*70+p.bond*2+p.titles.length*12+Math.max(0,50-spread*2)+p.totalQuestions*.15);const accuracy=p.totalQuestions?p.correct/p.totalQuestions:0,breadth=domains.filter(d=>p.mastery[d].count>0).length;const study=Math.round(p.totalQuestions*1.2+accuracy*180+p.bestStreak*5+breadth*18+domains.reduce((s,d)=>s+p.mastery[d].level,0)*5+Object.values(p.mastery).reduce((s,m)=>s+m.wrongReview,0)*2);const battle=Math.round(p.wins*22+p.bestWinStreak*12+Math.max(0,p.wins-(p.battles-p.wins))*8);const daily=Math.round(state.daily.study*3+state.daily.feed*8+state.daily.play*6+state.daily.train*5+state.daily.battle*9+state.daily.review*2);const total=growth+study+battle;return {growth,study,battle,daily,total,grade:gradeTable.find(x=>total>=x[1])[0],petGrade:petGradeTable.find(x=>growth>=x[1])[0]};}
function checkDailyReset(state){const d=new Date().toDateString();if(state.daily.date!==d){generateDiary(state,true);state.daily={date:d,study:0,feed:0,play:0,train:0,battle:0,review:0,praise:0,studyStars:0,huntStars:0,battleStars:0,exploreStars:0,leagueStars:0};}else if(!Number.isFinite(state.daily.praise))state.daily.praise=0;}
function checkLifeMilestones(state){const p=mainPet(state);if(p.bond>=95&&!p.memories.some(m=>m.type==='bond95'))addMemory(state,'서로를 가장 믿는 파트너가 되었다.','bond95');updateTitles(state);}
function generateDiary(state,force=false){const p=mainPet(state);if(!p)return null;const date=new Date().toISOString().slice(0,10);if(!force&&p.lastDiaryDate===date)return null;const today=state.daily;const bits=[];if(today.study)bits.push(`수학 문제를 ${today.study}개 풀었다`);if(today.play)bits.push(`${today.play}번 신나게 놀았다`);if(today.feed)bits.push(`${today.feed}번 맛있는 걸 먹었다`);if(today.battle)bits.push(`배틀을 ${today.battle}번 경험했다`);if(!bits.length&&!force)return null;const text=bits.length?`오늘은 ${bits.join(', ')}.`:`오늘도 함께 지낸 기록을 남겼다.`;p.diary.unshift({t:Date.now(),date,text});p.diary=p.diary.slice(0,90);p.lastDiaryDate=date;return text;}

function unlockRoom(state,id){const r=roomDefinitions.find(x=>x.id===id);if(!r)return {ok:false,msg:'공간이 없어.'};if(state.rooms.includes(id))return {ok:false,msg:'이미 해금한 공간이야.'};if(state.stars<r.price)return {ok:false,msg:'별이 부족해.'};state.stars-=r.price;state.economy.totalSpent+=r.price;state.rooms.push(id);addMemory(state,`${r.name} 공간을 새로 열었다.`,'room');return {ok:true,msg:`${r.name} 해금 완료.`};}
function switchRoom(state,id){if(!state.rooms.includes(id))return false;state.currentRoom=id;return true;}
function advanceRelationships(state){if(state.pets.length<2)return;for(const p of state.pets){for(const q of state.pets){if(p.id===q.id)continue;const old=p.relationships[q.id]||0;if(Math.random()<.003){let delta=1;if(p.primary==='다정함')delta++;if(p.primary==='경쟁적'&&q.primary==='경쟁적')delta=Math.random()<.5?-1:2;p.relationships[q.id]=clamp(old+delta,-50,100);const before=relationLabel(old),after=relationLabel(p.relationships[q.id]);if(before!==after){state.relationshipMemories.unshift({t:Date.now(),a:p.id,b:q.id,label:after});addMemory(state,`${p.name}과 ${q.name}의 관계가 '${after}' 단계가 되었다.`,'relationship',p);}}}}}
function jointTrain(state){if(state.pets.length<2)return {ok:false,msg:'두 마리 이상 있어야 해.'};const a=mainPet(state),others=state.pets.filter(p=>p.id!==a.id),b=pick(others);a.exp+=4;b.exp+=4;addPermanentStat(a,'attack',.025);addPermanentStat(b,'attack',.025);a.relationships[b.id]=clamp((a.relationships[b.id]||10)+5,-50,100);b.relationships[a.id]=clamp((b.relationships[a.id]||10)+5,-50,100);addMemory(state,`${a.name}과 ${b.name}이 함께 훈련했다. 관계는 ${relationLabel(a.relationships[b.id])}.`,'joint',a);levelCheck(state,a);levelCheck(state,b);return {ok:true,msg:`${a.name}과 ${b.name}이 합동 훈련을 마쳤다.`};}

function enterLeague(state,id){const cup=leagueCups.find(x=>x.id===id),p=mainPet(state);if(!cup)return {ok:false,msg:'대회가 없어.'};if(cup.min&&p.level<cup.min)return {ok:false,msg:'레벨 조건이 부족해.'};if(cup.max&&p.level>cup.max)return {ok:false,msg:'이 컵의 레벨 상한을 넘었어.'};if(cup.stage&&p.stage!==cup.stage)return {ok:false,msg:`${cup.stage}단계 펫만 참가할 수 있어.`};if(cup.stat&&p[cup.stat]<cup.need)return {ok:false,msg:'특화 능력치 조건이 부족해.'};if(cup.balance){const a=[p.attack,p.defense,p.hp/2,p.agility,p.intelligence];if(Math.max(...a)-Math.min(...a)>8)return {ok:false,msg:'균형 육성 조건이 부족해.'};}const power=p.level*2+p.attack+p.defense+p.hp*.2+p.agility+p.intelligence,opp=55+(p.level+rnd(0,4))*6,chance=clamp(.48+(power-opp)/180,.18,.82),win=Math.random()<chance;if(win){const desired=2+rnd(0,1),gain=Math.max(0,Math.min(desired,3-state.daily.leagueStars));if(gain){state.stars+=gain;state.daily.leagueStars+=gain;state.economy.totalEarned+=gain;}p.wins++;p.battles++;addMemory(state,`${cup.name}에서 좋은 성적을 거두었다.`,'league');updateTitles(state);return {ok:true,msg:`${cup.name} 승리!${gain?` 별 ${gain}개를 얻었다.`:' 오늘의 컵 별 보상은 모두 받았어.'}`};}p.battles++;p.winStreak=0;return {ok:true,msg:`${cup.name}에서 아쉽게 졌지만 기록은 남았다.`};}

function weekKey(){const d=new Date(),first=new Date(d.getFullYear(),0,1),days=Math.floor((d-first)/86400000);return `${d.getFullYear()}-W${String(Math.ceil((days+first.getDay()+1)/7)).padStart(2,'0')}`;}
function weeklyLeague(state){const wk=weekKey();if(state.weeklyLeague.week!==wk)state.weeklyLeague={week:wk,plays:0,wins:0,bestScore:0};return state.weeklyLeague;}
function enterWeeklyLeague(state){const p=mainPet(state),w=weeklyLeague(state);if(w.plays>=5)return {ok:false,msg:'이번 주 로컬 리그 5회 참가를 모두 사용했어.'};w.plays++;const power=computeScores(state).growth*.45+computeScores(state).battle*.25+computeScores(state).study*.18;const opponent=140+rnd(0,320)+p.level*15;const score=Math.max(0,Math.round(power+rnd(-35,35)));const win=score>=opponent;if(win){w.wins++;const gain=2+(w.wins===3?2:0);state.stars+=gain;state.economy.totalEarned+=gain;}w.bestScore=Math.max(w.bestScore,score);addMemory(state,`주간 로컬 리그에서 ${win?'승리':'패배'}했다. 기록 ${score}.`,'weekly-league');return {ok:true,msg:`주간 리그 ${win?'승리':'패배'} · 기록 ${score} · 이번 주 ${w.wins}승/${w.plays}전`};}

function seasonInfo(state){const s=currentSeason();return {...s,claimed:state.seasonClaim===`${new Date().getFullYear()}-${s.id}`};}
function claimSeason(state){const s=currentSeason(),key=`${new Date().getFullYear()}-${s.id}`;if(state.seasonClaim===key)return {ok:false,msg:'이번 시즌 선물은 이미 받았어.'};state.seasonClaim=key;state.stars+=5;state.economy.totalEarned+=5;state.inventory[`season_${s.id}`]=(state.inventory[`season_${s.id}`]||0)+1;const p=mainPet(state);if(!p.titles.includes(s.title))p.titles.push(s.title);state.codex.decor.push(s.decor);addMemory(state,`${s.name} 시즌 기념 장식과 칭호를 받았다.`,'season');return {ok:true,msg:`${s.name} 시즌 선물: 별 5개, 장식, '${s.title}' 칭호.`};}

// ===== audio.js =====
const CUES={
 tap:[[520,.028,'sine',.022,0]],
 squish:[[310,.035,'sine',.018,0],[420,.045,'triangle',.014,.028]],
 sheet_open:[[360,.045,'sine',.018,0],[520,.065,'sine',.018,.035],[650,.06,'triangle',.012,.07]],
 sheet_close:[[560,.04,'sine',.016,0],[420,.055,'sine',.014,.03]],
 open:[[420,.045,'sine',.028,0],[620,.055,'sine',.022,.035]],
 close:[[560,.04,'sine',.024,0],[390,.05,'sine',.018,.025]],
 ok:[[660,.06,'sine',.03,0],[820,.07,'sine',.025,.045]],
 error:[[190,.07,'square',.025,0],[150,.09,'triangle',.018,.055]],
 reward:[[720,.07,'triangle',.032,0],[930,.08,'sine',.032,.055],[1120,.11,'sine',.023,.11]],
 hit:[[150,.035,'triangle',.024,0],[92,.05,'sine',.016,.028]],
 scold:[[260,.04,'triangle',.018,0],[210,.055,'sine',.016,.04],[170,.06,'triangle',.012,.085]],
 battle:[[250,.06,'square',.024,0],[380,.075,'triangle',.025,.05]],
 rare:[[780,.1,'sine',.03,0],[1040,.12,'triangle',.035,.07],[1320,.18,'sine',.025,.15]],
 loot_common:[[520,.045,'sine',.018,0],[680,.055,'triangle',.016,.04]],
 loot_uncommon:[[600,.055,'sine',.022,0],[820,.07,'triangle',.022,.045]],
 loot_rare:[[740,.07,'triangle',.028,0],[980,.09,'sine',.03,.055],[1180,.12,'triangle',.022,.12]],
 loot_epic:[[520,.06,'triangle',.025,0],[780,.08,'sine',.03,.05],[1050,.12,'triangle',.03,.11],[1320,.17,'sine',.025,.19]],
 loot_legendary:[[420,.07,'triangle',.028,0],[720,.09,'sine',.032,.05],[980,.11,'triangle',.035,.12],[1320,.16,'sine',.03,.2],[1580,.24,'sine',.022,.3]],
 level:[[540,.08,'triangle',.03,0],[720,.09,'triangle',.032,.07],[980,.16,'sine',.028,.15]],
 evolution:[[260,.12,'sine',.028,0],[390,.13,'triangle',.03,.08],[620,.15,'sine',.035,.18],[880,.2,'triangle',.034,.31],[1180,.28,'sine',.026,.48]],
 feed_crunch:[[180,.025,'square',.02,0],[240,.025,'triangle',.018,.055],[320,.03,'square',.014,.11]],
 feed_soft:[[420,.05,'sine',.016,0],[500,.06,'triangle',.014,.05]],
 feed_special:[[620,.06,'sine',.02,0],[820,.08,'triangle',.024,.055],[1080,.12,'sine',.022,.13]],
 heal:[[440,.08,'sine',.025,0],[660,.11,'sine',.025,.06]],
 buy:[[610,.055,'triangle',.026,0],[860,.08,'sine',.026,.045]],
 skill_fire:[[300,.05,'sawtooth',.026,0],[520,.08,'triangle',.024,.04]],
 skill_fire_heavy:[[220,.07,'sawtooth',.03,0],[420,.1,'square',.026,.05],[680,.1,'triangle',.02,.1]],
 skill_magic:[[620,.06,'sine',.022,0],[840,.09,'triangle',.024,.04]],
 skill_beam:[[480,.05,'sawtooth',.02,0],[760,.14,'sine',.028,.05],[1180,.1,'triangle',.022,.14]],
 skill_wind:[[700,.035,'triangle',.02,0],[980,.055,'sine',.02,.025]],
 skill_combo:[[260,.035,'square',.02,0],[420,.04,'triangle',.022,.035],[620,.05,'sawtooth',.022,.07]],
 skill_heal:[[520,.08,'sine',.02,0],[720,.1,'sine',.024,.06],[920,.12,'triangle',.018,.12]],
 skill_prism:[[580,.05,'triangle',.02,0],[820,.06,'sine',.022,.035],[1040,.08,'triangle',.018,.07]],
 skill_guard:[[180,.06,'triangle',.026,0],[260,.08,'square',.018,.04]],
 skill_earth:[[150,.08,'square',.028,0],[230,.11,'triangle',.024,.05],[340,.1,'sine',.018,.12]],
 ultimate:[[180,.08,'sawtooth',.024,0],[360,.09,'square',.026,.06],[720,.16,'triangle',.028,.13]],
 item:[[480,.035,'triangle',.018,0],[620,.05,'sine',.016,.03]],
 land:[[120,.035,'triangle',.023,0],[180,.045,'sine',.015,.025]],
 pet_happy:[[540,.045,'sine',.018,0],[700,.055,'triangle',.016,.035]],
 play:[[420,.035,'triangle',.018,0],[620,.045,'sine',.018,.035],[780,.05,'triangle',.014,.07]],
 talk:[[500,.04,'sine',.014,0],[570,.04,'sine',.013,.045]],
 train:[[190,.04,'square',.018,0],[290,.05,'triangle',.018,.035]],
 walk_start:[[330,.05,'triangle',.018,0],[470,.06,'sine',.018,.04],[610,.07,'triangle',.016,.085]],
 walk_friend:[[620,.06,'sine',.018,0],[780,.07,'triangle',.02,.05]],
 walk_gift:[[660,.055,'triangle',.022,0],[880,.075,'sine',.024,.045],[1080,.1,'triangle',.018,.105]],
 walk_finish:[[520,.06,'triangle',.022,0],[740,.08,'sine',.024,.055],[980,.11,'sine',.02,.125]],
 hunt_start:[[170,.055,'square',.018,0],[260,.065,'triangle',.02,.045],[390,.07,'sine',.016,.095]],
 hunt_return:[[430,.055,'sine',.018,0],[320,.07,'triangle',.016,.045]],
 cheer:[[620,.05,'triangle',.018,0],[820,.065,'sine',.018,.04]],
 rest:[[360,.08,'sine',.014,0],[280,.11,'sine',.012,.07]],
 battle_start:[[180,.06,'square',.022,0],[300,.07,'triangle',.022,.05],[460,.085,'square',.018,.105]],
 victory:[[620,.065,'triangle',.026,0],[840,.085,'sine',.028,.055],[1120,.13,'triangle',.022,.13]],
 defeat:[[260,.08,'triangle',.018,0],[190,.1,'sine',.016,.07],[140,.13,'sine',.012,.15]],
 room_move:[[380,.04,'sine',.015,0],[520,.05,'triangle',.014,.035]],
 sell:[[700,.045,'triangle',.02,0],[520,.06,'sine',.016,.04]]
};
function createAudio(state){
 let ctx=null,musicTimer=0,musicStep=0,musicEl=null;
 const audioCtx=()=>ctx||(ctx=new (window.AudioContext||window.webkitAudioContext)());
 function one(freq,dur,type='sine',vol=.025,delay=0){if(!state.settings.sfx)return;try{const c=audioCtx(),t=c.currentTime+delay,o=c.createOscillator(),g=c.createGain();o.type=type;o.frequency.setValueAtTime(freq,t);g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(vol,t+.007);g.gain.exponentialRampToValueAtTime(.0001,t+dur);o.connect(g).connect(c.destination);o.start(t);o.stop(t+dur+.025);}catch{}}
 function sfx(name='tap'){if(!state.settings.sfx)return;const src=audioAssetPath('sfx',name);if(src){try{const a=new Audio(src);a.volume=.55;a.play().catch(()=>{});return;}catch{}}for(const tone of (CUES[name]||CUES.tap))one(...tone);}
 function haptic(kind='tap'){if(!state.settings.haptics||!navigator.vibrate)return;try{navigator.vibrate(kind==='reward'?[10,25,14]:kind==='hit'?[16]:[6]);}catch{}}
 function stopMusic(){clearInterval(musicTimer);musicTimer=0;if(musicEl){try{musicEl.pause();musicEl.currentTime=0;}catch{}musicEl=null;}}
 function musicPulse(){if(!state.settings.music||document.hidden)return;try{const c=audioCtx(),tab=state.ui?.tab||'home',sets={home:[220,277.18,329.63,277.18],study:[261.63,329.63,392,329.63],hunt:[196,246.94,293.66,246.94],battle:[174.61,220,261.63,220]};const notes=sets[tab]||sets.home,t=c.currentTime,o=c.createOscillator(),g=c.createGain();o.type='sine';o.frequency.value=notes[musicStep++%notes.length];g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(.0085,t+.05);g.gain.exponentialRampToValueAtTime(.0001,t+.7);o.connect(g).connect(c.destination);o.start(t);o.stop(t+.74);}catch{}}
 function syncMusic(){stopMusic();if(!state.settings.music)return;const tab=state.ui?.tab||'home',src=audioAssetPath('music',tab)||audioAssetPath('music','default');if(src){try{musicEl=new Audio(src);musicEl.loop=true;musicEl.volume=.28;musicEl.play().catch(()=>{});return;}catch{musicEl=null;}}musicStep=0;musicPulse();musicTimer=setInterval(musicPulse,1550);}
 async function unlock(){try{const c=audioCtx();if(c.state==='suspended')await c.resume();syncMusic();}catch{}}
 function cueForMessage(msg=''){if(!msg)return;if(/희귀|각성/.test(msg)){sfx('rare');haptic('reward');}else if(/레벨|진화/.test(msg)){sfx('level');haptic('reward');}else if(/판매/.test(msg)){sfx('sell');haptic('reward');}else if(/구매|교환/.test(msg)){sfx('buy');haptic('reward');}else if(/회복|먹었다/.test(msg)){sfx('heal');}else if(/완료|해금|얻|승리|정답|성공|가족/.test(msg)){sfx('reward');haptic('reward');}else if(/부족|아직|위험|오답|패배|졌|없어/.test(msg)){sfx('error');}else sfx('ok');}
 document.addEventListener('pointerdown',()=>unlock(),{once:true,capture:true});
 document.addEventListener('visibilitychange',()=>{if(document.hidden)stopMusic();else syncMusic();});
 return {unlock,sfx,haptic,syncMusic,cueForMessage,destroy(){stopMusic();if(ctx)ctx.close();}};
}

// ===== render.js =====
const petAtlas=new Image();petAtlas.src='assets/pet_atlas.webp?rev='+encodeURIComponent(BUILD_REV);
const newbornPetSheet=new Image();newbornPetSheet.src='assets/pets/common_stage0_6x12.png?rev='+encodeURIComponent(BUILD_REV);
const monsterAtlas=new Image();
const roomVisual=new Map();
function ctx2(id){const c=document.getElementById(id);if(!c)return null;const r=c.getBoundingClientRect();const dpr=Math.min(2,window.devicePixelRatio||1),tw=Math.max(2,Math.round(r.width*dpr)),th=Math.max(2,Math.round(r.height*dpr));if(r.width>4&&r.height>4&&(c.width!==tw||c.height!==th)){c.width=tw;c.height=th;}c._logicalWidth=r.width;c._logicalHeight=r.height;c._dpr=dpr;const x=c.getContext('2d');x.imageSmoothingEnabled=false;return [c,x];}

function newbornPoseIndex(state='idle',dir='down'){
 // 0단계 전용 6x12 시트 행 매핑
 // 0 idle, 1 walk L, 2 walk R, 3 run L, 4 run R, 5 happy,
 // 6 eat, 7 sleep, 8 surprised, 9 hurt/sad, 10 jump/play, 11 attack.
 if(state==='walk') return dir==='left'?1:2;
 if(state==='run') return dir==='left'?3:4;
 const rows={idle:0,jump:10,happy:5,play:10,eat:6,sleep:7,cry:9,surprised:8,hurt:9,pet:5,interact:5,held:0,lie:7,faint:7,faint_idle:7,defeat:9,victory:5,dodge:10,attack:11,skill:11};
 return rows[state]??0;
}
function drawNewbornPet(ctx,state='idle',dir='down',frame=0,x=0,y=0,w=96,h=96){
 const img=newbornPetSheet;
 if(!(img&&img.complete&&img.naturalWidth&&img.naturalHeight))return false;
 const cols=6,rows=12,sw=Math.floor(img.naturalWidth/cols),sh=Math.floor(img.naturalHeight/rows),row=newbornPoseIndex(state,dir),sx=(Math.abs(frame)%cols)*sw,sy=row*sh;
 // Keep one fixed source window for every pose. This preserves the artist's relative body scale
 // while leaving enough transparent room for arms / attack extensions.
 const safe=8,srcX=sx+safe,srcY=sy+safe,srcW=sw-safe*2,srcH=sh-safe*2;
 ctx.save();ctx.imageSmoothingEnabled=false;
 ctx.drawImage(img,srcX,srcY,srcW,srcH,x,y,w,h);
 ctx.restore();return true;
}
function drawFallbackPet(ctx,row,x,y,w=96,h=96){
 const palettes=[['#ff9a7a','#fff1d5'],['#8b7cff','#e8e1ff'],['#57cdb0','#ddfff4'],['#f28eb7','#ffe6f0'],['#f0b44f','#fff0bf'],['#6ea6e8','#e4f1ff']],pal=palettes[((row%palettes.length)+palettes.length)%palettes.length];
 ctx.save();ctx.translate(x+w/2,y+h/2);ctx.shadowColor='rgba(54,62,76,.18)';ctx.shadowBlur=Math.max(3,w*.05);ctx.fillStyle=pal[0];ctx.beginPath();ctx.ellipse(0,h*.08,w*.30,h*.31,0,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.moveTo(-w*.23,-h*.10);ctx.lineTo(-w*.14,-h*.34);ctx.lineTo(-w*.02,-h*.13);ctx.closePath();ctx.fill();ctx.beginPath();ctx.moveTo(w*.23,-h*.10);ctx.lineTo(w*.14,-h*.34);ctx.lineTo(w*.02,-h*.13);ctx.closePath();ctx.fill();ctx.shadowBlur=0;ctx.fillStyle=pal[1];ctx.beginPath();ctx.ellipse(0,h*.13,w*.20,h*.18,0,0,Math.PI*2);ctx.fill();ctx.fillStyle='#2f3341';ctx.beginPath();ctx.arc(-w*.10,-h*.02,w*.035,0,Math.PI*2);ctx.arc(w*.10,-h*.02,w*.035,0,Math.PI*2);ctx.fill();ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(-w*.088,-h*.035,w*.011,0,Math.PI*2);ctx.arc(w*.112,-h*.035,w*.011,0,Math.PI*2);ctx.fill();ctx.strokeStyle='#5e4b4b';ctx.lineWidth=Math.max(2,w*.018);ctx.beginPath();ctx.arc(0,h*.075,w*.06,.18,Math.PI-.18);ctx.stroke();ctx.restore();
}
function sprite(ctx,row,frame,x,y,w=96,h=96){if(petAtlas.complete&&petAtlas.naturalWidth&&petAtlas.naturalHeight){try{ctx.drawImage(petAtlas,(frame%4)*64,row*64,64,64,x,y,w,h);return true;}catch{}}drawFallbackPet(ctx,row,x,y,w,h);return false;}
function drawFallbackMonster(ctx,row,x,y,w=96,h=96){const cols=['#79c56d','#7aa1df','#d98a72','#b17bd6','#d9b24d','#6eb7b0'],c=cols[((row%cols.length)+cols.length)%cols.length];ctx.save();ctx.translate(x+w/2,y+h/2);ctx.fillStyle=c;ctx.shadowColor='rgba(28,35,45,.25)';ctx.shadowBlur=Math.max(3,w*.04);ctx.beginPath();ctx.ellipse(0,h*.10,w*.34,h*.28,0,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0;ctx.fillStyle='#202636';ctx.beginPath();ctx.arc(-w*.11,h*.03,w*.035,0,Math.PI*2);ctx.arc(w*.11,h*.03,w*.035,0,Math.PI*2);ctx.fill();ctx.strokeStyle='#202636';ctx.lineWidth=Math.max(2,w*.018);ctx.beginPath();ctx.moveTo(-w*.07,h*.16);ctx.lineTo(w*.07,h*.16);ctx.stroke();ctx.restore();}
function monster(ctx,row,frame,x,y,w=96,h=96){if(monsterAtlas.complete&&monsterAtlas.naturalWidth&&monsterAtlas.naturalHeight){try{const cols=4,rows=12,sw=monsterAtlas.naturalWidth/cols,sh=monsterAtlas.naturalHeight/rows,safeRow=((row%rows)+rows)%rows;ctx.save();ctx.imageSmoothingEnabled=false;ctx.drawImage(monsterAtlas,(Math.abs(frame)%cols)*sw,safeRow*sh,sw,sh,x,y,w,h);ctx.restore();return true;}catch{}}drawFallbackMonster(ctx,row,x,y,w,h);return false;}
const petAtlasRowsV2={idle_down:0,idle_up:1,idle_side:2,walk_down:3,walk_up:4,walk_side:5,run_down:6,run_up:7,run_side:8,attack:9,skill:10,hurt:11,faint:12,faint_idle:13,eat:14,interact:15,sleep:16,held:17,cry:18,lie:19,happy:20,dodge:21,victory:22,defeat:23};
const petAtlasRowsLegacy={idle_down:0,idle_up:1,idle_side:2,walk_down:3,walk_up:4,walk_side:5,run_down:6,run_up:7,run_side:8,attack:9,eat:10,held:11,cry:12,lie:13,sleep:14,faint:15,happy:16,hurt:17,interact:18,dodge:19,victory:20,defeat:21};
function petRow(state,dir,map){if(state==='idle'||state==='walk'||state==='run')return map[`${state}_${dir==='left'||dir==='right'?'side':dir}`]??0;if(state==='skill'&&map===petAtlasRowsLegacy)return map.attack;if(state==='faint_idle'&&map===petAtlasRowsLegacy)return map.faint;return map[state]??map.interact;}

// Start a new action at its first painted frame. Collapse/defeat hold their final pose.
const petAnimationClocks=new WeakMap();
const petTravelClocks=new WeakMap();
function petTravelFrame(ctx,p,state,pos,size){let map=petTravelClocks.get(ctx);if(!map){map=new Map();petTravelClocks.set(ctx,map);}const key=p.id||p.starter,now=performance.now();let c=map.get(key);if(!c||now-c.at>250||c.state!==state){c={x:pos.x,y:pos.y,phase:0,at:now,state};map.set(key,c);}const distance=Math.hypot(pos.x-c.x,pos.y-c.y);if(distance<size*.7)c.phase+=distance/(size*(state==='run'?.72:.42))*6;c.x=pos.x;c.y=pos.y;c.at=now;return Math.floor(c.phase)%6;}

function petAnimationFrame(ctx,p,state,dir,stage,now=performance.now()){
 let clocks=petAnimationClocks.get(ctx);if(!clocks){clocks=new Map();petAnimationClocks.set(ctx,clocks);}
 const key=(p.id||p.starter)+':'+p.starter+':'+stage;
 const direction=['idle','walk','run'].includes(state)?(dir==='left'||dir==='right'?'side':dir):'action';
 const pose=state+':'+direction;let clock=clocks.get(key);
 if(!clock||clock.pose!==pose||now-clock.last>400){clock={pose,start:now,last:now};clocks.set(key,clock);}
 clock.last=now;
 const ms={walk:120,run:90,attack:95,skill:110,hurt:110,faint:130,faint_idle:220,eat:150,interact:150,sleep:260,held:150,cry:170,lie:220,happy:120,dodge:95,victory:140,defeat:160}[state]||190;
 const frame=Math.floor(Math.max(0,now-clock.start)/ms);
 return state==='faint'||state==='defeat'?Math.min(5,frame):frame%6;
}

function drawPet(ctx,p,state='idle',dir='down',frame=0,x=0,y=0,w=96,h=96,stageOverride=null,travel=null){const stage=stageOverride??(p.temporaryRegression?2:p.stage);if(stage===0){if(drawNewbornPet(ctx,state,dir,frame,x,y,w,h))return true;const t=frame*.55,bob=Math.sin(t)*h*.025,squash=1+Math.sin(t)*.025;ctx.save();ctx.translate(x+w/2,y+h*.56+bob);ctx.scale(squash,1/squash);const g=ctx.createRadialGradient(-w*.12,-h*.18,w*.04,0,0,w*.46);g.addColorStop(0,'#ffd9c8');g.addColorStop(.62,'#ffb9b5');g.addColorStop(1,'#f39aaa');ctx.fillStyle=g;ctx.beginPath();ctx.ellipse(0,0,w*.36,h*.29,0,0,Math.PI*2);ctx.fill();ctx.fillStyle='#5b454c';ctx.beginPath();ctx.ellipse(-w*.11,-h*.035,w*.026,h*.055,0,0,Math.PI*2);ctx.ellipse(w*.11,-h*.035,w*.026,h*.055,0,0,Math.PI*2);ctx.fill();ctx.strokeStyle='#704f58';ctx.lineWidth=Math.max(2,w*.018);ctx.beginPath();ctx.arc(0,h*.035,w*.055,.15*Math.PI,.85*Math.PI);ctx.stroke();ctx.restore();return true;}const safeStage=Math.max(1,Math.min(4,stage||1));const resolved=resolvePetAsset(p.starter,safeStage),img=getAsset('pets',resolved.id);if(img&&img.complete&&img.naturalWidth&&img.naturalHeight){const modern=resolved.format==='modern24'||(img.naturalWidth>=768&&img.naturalHeight>=3072),frames=modern?6:4,rows=modern?24:22,map=modern?petAtlasRowsV2:petAtlasRowsLegacy,sw=img.naturalWidth/frames,sh=img.naturalHeight/rows,row=petRow(state,dir,map),paintedFrame=travel&&['walk','run'].includes(state)?petTravelFrame(ctx,p,state,travel,w):(resolved.verifiedAnimation||resolved.format==='modern24')?petAnimationFrame(ctx,p,state,dir,safeStage):frame,sx=((Math.floor(paintedFrame)%frames+frames)%frames)*sw,sy=row*sh;ctx.save();if(dir==='left'){ctx.translate(x+w,y);ctx.scale(-1,1);ctx.drawImage(img,sx,sy,sw,sh,0,0,w,h);}else ctx.drawImage(img,sx,sy,sw,sh,x,y,w,h);ctx.restore();if(resolved.stage===3&&state==='eat')drawPetFood(ctx,p,paintedFrame,dir,x,y,w,h,resolved);return true;}sprite(ctx,starterIndex(p),frame,x,y,w,h);return false;}
function drawPetFood(ctx,p,frame,dir,x,y,w,h,meta){if(!p.lastFood||Date.now()-p.lastFood.at>2400)return;const img=getAsset('items',p.lastFood.id);if(!img?.complete||!img.naturalWidth)return;const anchors=meta.foodAnchors||[[.5,.77],[.5,.68],[.5,.60],[.5,.69],[.5,.77],[.5,.80]],a=anchors[Math.floor(frame)%6],bite=[1,1,.85,.60,.30,0][Math.floor(frame)%6],size=w*.09*bite;if(!bite)return;ctx.save();ctx.drawImage(img,x+(dir==='left'?1-a[0]:a[0])*w-size/2,y+a[1]*h-size/2,size,size);ctx.restore();}
const monsterAnimRows={idle:0,walk:1,attack:2,skill:3,hit:4,death:5};
// Artwork facing is recorded per action; flip means face the opponent on the left.
function drawMonster(ctx,id,row,state='idle',frame=0,x=0,y=0,w=96,h=96,flip=false){
 const img=getAsset('monsters',id);if(!img?.complete||!img.naturalWidth)return false;
 const r=monsterAnimRows[state]??0,sw=img.naturalWidth/8,sh=img.naturalHeight/6;
 const f=['attack','skill','hit','death'].includes(state)?Math.min(7,Math.max(0,Math.floor(frame))):((Math.floor(frame)%8)+8)%8;
 const leftPainted=id==='mushroom'&&(state==='walk'||state==='attack'&&[1,2,3].includes(f));
 // Some original cells contain only the projectile. Keep the complete casting body visible.
 const effectOnly=state==='attack'&&((id==='firemage'&&[4,5].includes(f))||(id==='drone'&&f===5)||(['shadowbat','spar','green_slime'].includes(id)&&f===4))||id==='leafling'&&state==='skill'&&f===4;
 const bodyFrame=effectOnly?(id==='drone'?4:['spar','green_slime'].includes(id)?5:3):f;
 ctx.save();ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality='high';ctx.translate(x,y);
 if(Boolean(flip)!==leftPainted){ctx.translate(w,0);ctx.scale(-1,1);}
 if(id==='fox'&&state==='attack'&&f===5){
  // The rear slash is fused to the tail in the source. Use the intact recovery pose and a separate forward slash.
  ctx.drawImage(img,6*sw,r*sh,sw,sh,0,0,w,h);
  const slash=getAsset('fx','pet_elements');
  if(slash?.complete&&slash.naturalWidth)ctx.drawImage(slash,2*128,0,128,128,w*.55,h*.16,w*.75,h*.75);
 }else ctx.drawImage(img,bodyFrame*sw,r*sh,sw,sh,id==='drone'&&state==='attack'?w*[0,3,2,-3,-7,-7,-4,1][f]/128:0,0,w,h);
 if(effectOnly){const burst=id==='leafling',dx=burst?0:w*(f===5?.43:.28);ctx.drawImage(img,f*sw,r*sh,sw,sh,dx,burst?0:-h*.12,w,h);}
 ctx.restore();return true;
}
const starterIndex=p=>p?Math.max(0,starters.findIndex(s=>s.id===p.starter)):0;
function drawRoomBackdrop(ctx,id,w,h){
 const portrait=w/h<.82;
 const portraitImg=portrait?getAsset('rooms_portrait',id):null;
 const img=(portraitImg&&portraitImg.complete&&portraitImg.naturalWidth&&portraitImg.naturalHeight)?portraitImg:getAsset('rooms',id);
 if(!(img&&img.complete&&img.naturalWidth&&img.naturalHeight))return false;
 ctx.save();ctx.imageSmoothingEnabled=false;
 const iw=img.naturalWidth,ih=img.naturalHeight;
 const scale=Math.max(w/iw,h/ih);
 const sw=w/scale,sh=h/scale;
 const sx=Math.max(0,(iw-sw)/2);
 const bias=id==='living'?.22:id==='study'?.28:id==='battle_room'?.40:.30;
 const sy=Math.max(0,Math.min(ih-sh,(ih-sh)*bias));
 ctx.drawImage(img,sx,sy,sw,sh,0,0,w,h);
 ctx.restore();return true;
}
function roomDepthScale(y){return clamp(.86+((y-.60)/.20)*.24,.84,1.12);}
const furnitureRenderSize={
 starter_bed:[228,196],bed:[176,152],bookshelf:[118,134],sofa:[136,108],plant:[84,104],trampoline:[126,94],training:[132,112],desk:[134,114],mirror:[88,128],fridge:[96,128],console:[124,98],lamp:[72,118],toybox:[112,92],easel:[92,126],bath:[132,100],music:[112,94],trophy:[110,96],wardrobe:[110,138],ball:[58,58],window:[160,212]
};
const furnitureAnchorY={starter_bed:-74,bed:-70,bookshelf:-64,sofa:-48,plant:-44,trampoline:-34,training:-46,desk:-48,mirror:-58,fridge:-62,console:-42,lamp:-54,toybox:-36,easel:-56,bath:-38,music:-40,trophy:-34,wardrobe:-66,ball:-22,window:-122};
function drawFurniture(x,id,scale=1){const [aw,ah]=furnitureRenderSize[id]||[120,120],cy=furnitureAnchorY[id]??(-Math.max(28,ah*.28));x.save();x.scale(scale,scale);if(drawAssetCentered(x,'furniture',id,0,cy,aw,ah)){x.restore();return;}if(id.includes('bed')){x.fillStyle='#784f70';x.fillRect(-58,-22,116,44);x.fillStyle='#d8b9d7';x.fillRect(-50,-18,100,30);}else if(id==='sofa'){x.fillStyle='#6e5b8b';x.fillRect(-55,-35,110,55);x.fillStyle='#a68dc1';x.fillRect(-48,-28,96,30);}else if(id==='bookshelf'){x.fillStyle='#6b4c32';x.fillRect(-35,-70,70,85);for(let i=0;i<4;i++){x.fillStyle=['#e78080','#7ab1d5','#e5c76f','#8ebd84'][i];x.fillRect(-28+i*14,-55,10,54);}}else if(id==='plant'){x.fillStyle='#7b5538';x.fillRect(-18,-10,36,30);x.fillStyle='#5aa56a';x.beginPath();x.arc(0,-28,30,0,Math.PI*2);x.fill();}else if(id==='trampoline'){x.strokeStyle='#5d496e';x.lineWidth=8;x.beginPath();x.ellipse(0,0,48,18,0,0,Math.PI*2);x.stroke();}else if(id==='training'){x.fillStyle='#52657c';x.fillRect(-42,-12,84,12);x.fillRect(-32,-45,9,45);x.fillRect(23,-45,9,45);}else if(id==='desk'){x.fillStyle='#8a633e';x.fillRect(-48,-18,96,18);x.fillRect(-40,0,8,45);x.fillRect(32,0,8,45);}else if(id==='mirror'){x.fillStyle='#a7bdd0';x.fillRect(-30,-72,60,80);x.strokeStyle='#6b4d43';x.lineWidth=7;x.strokeRect(-34,-76,68,88);}else if(id==='fridge'){x.fillStyle='#d5e3ea';x.fillRect(-35,-72,70,92);x.fillStyle='#7aa4b8';x.fillRect(20,-55,5,20);}else if(id==='console'){x.fillStyle='#454d68';x.fillRect(-38,-28,76,48);x.fillStyle='#84c1d8';x.fillRect(-25,-20,50,25);}else if(id==='lamp'){x.fillStyle='#66556f';x.fillRect(-5,-45,10,45);x.fillStyle='#ffe7a8';x.beginPath();x.arc(0,-55,20,0,Math.PI*2);x.fill();}else if(id==='toybox'){x.fillStyle='#7b5c8e';x.fillRect(-38,-20,76,40);x.fillStyle='#d8b1ef';x.fillRect(-32,-14,64,8);}else if(id==='easel'){x.strokeStyle='#7b573b';x.lineWidth=6;x.beginPath();x.moveTo(-22,35);x.lineTo(0,-55);x.lineTo(24,35);x.stroke();x.fillStyle='#e8dfcf';x.fillRect(-28,-48,56,48);}else if(id==='bath'){x.fillStyle='#d7eef4';x.beginPath();x.ellipse(0,0,52,24,0,0,Math.PI*2);x.fill();x.strokeStyle='#79aebc';x.lineWidth=5;x.stroke();}else if(id==='music'){x.fillStyle='#3f465f';x.fillRect(-32,-34,64,54);x.fillStyle='#9ed5e8';x.fillRect(-20,-24,40,12);x.beginPath();x.arc(-16,5,8,0,Math.PI*2);x.arc(16,5,8,0,Math.PI*2);x.fill();}else if(id==='trophy'){x.fillStyle='#6f523b';x.fillRect(-42,-40,84,60);x.fillStyle='#ffd66e';x.fillRect(-8,-34,16,26);x.beginPath();x.arc(0,-38,18,0,Math.PI*2);x.fill();}else if(id==='wardrobe'){x.fillStyle='#76566f';x.fillRect(-40,-78,80,96);x.fillStyle='#a9829d';x.fillRect(-34,-70,30,78);x.fillRect(4,-70,30,78);x.fillStyle='#f4d8a6';x.beginPath();x.arc(-9,-30,3,0,Math.PI*2);x.arc(9,-30,3,0,Math.PI*2);x.fill();}else if(id==='ball'){x.fillStyle='#ffd369';x.beginPath();x.arc(0,-8,24,0,Math.PI*2);x.fill();x.strokeStyle='#fff5c7';x.lineWidth=4;x.beginPath();x.arc(0,-8,14,0,Math.PI*2);x.stroke();}x.restore();}
function getVisual(p,i){if(!roomVisual.has(p.id))roomVisual.set(p.id,{x:i===0?.40:.67,y:.73,tx:i===0?.40:.67,ty:.73,lastMove:0});return roomVisual.get(p.id);}

function drawPetElementFx(ctx,p,action,cx,cy,size,flip=false){if(!p||p.stage===0||!action||!['attack','skill','ultimate','ult'].includes(action.kind))return false;const elapsed=Date.now()-action.at;if(elapsed<0)return false;if(elapsed>=660)return true;const row={brave:0,careful:1,wise:2,kind:3}[p.starter];if(row==null)return false;const img=getAsset('fx','pet_elements');if(!img?.complete||!img.naturalWidth)return false;const f=Math.min(5,Math.floor(elapsed/110));ctx.save();ctx.translate(cx,cy);if(flip)ctx.scale(-1,1);ctx.drawImage(img,f*128,row*128,128,128,-size/2,-size/2,size,size);ctx.restore();return true;}
function drawActionFx(x,action,w,h,side='left'){
 if(!action||Date.now()-action.at>900)return;
 const age=(Date.now()-action.at)/900,p=1-age,actorLeft=action.side!=='enemy',targetLeft=action.side==='enemy',actorX=actorLeft?w*.25:w*.73,targetX=targetLeft?w*.25:w*.73,actorY=h*.55,targetY=h*.52;
 let cx=targetX,cy=targetY;
 x.save();x.globalAlpha=Math.max(0,p);
 const fx=action.fx||'slash';if(drawFxAsset(x,fx,Math.floor(age*4),cx,cy,190)){if(action.name&&age<.7){x.fillStyle='#fff';x.font='800 18px system-ui';x.textAlign='center';x.fillText(action.name,cx,42);x.textAlign='left';}x.restore();return;}
 if(/beam/.test(fx)){
  x.lineCap='round';
  x.strokeStyle='rgba(255,255,255,.40)';x.lineWidth=18+8*p;x.beginPath();x.moveTo(actorX,actorY-12);x.lineTo(targetX,targetY-10);x.stroke();
  x.strokeStyle='rgba(165,234,255,.95)';x.lineWidth=8+5*p;x.beginPath();x.moveTo(actorX,actorY-12);x.lineTo(targetX,targetY-10);x.stroke();
  x.fillStyle='rgba(255,247,191,.92)';x.beginPath();x.arc(targetX,targetY,18+22*age,0,Math.PI*2);x.fill();
 }
 else if(/fire|Burst|ultimate|awakenUlt/.test(fx)){
  for(let i=0;i<18;i++){const a=i/18*Math.PI*2+age*2.8,r=(26+78*age)*(1+(i%3)*.06);x.fillStyle=i%2?'#ffd36b':'#ff7b5d';x.beginPath();x.arc(targetX+Math.cos(a)*r,targetY+Math.sin(a)*r,3+6*p,0,Math.PI*2);x.fill();}
  x.strokeStyle='rgba(255,244,188,.95)';x.lineWidth=6+4*p;x.beginPath();x.arc(targetX,targetY,20+44*age,0,Math.PI*2);x.stroke();
 }
 else if(/wind|dash|cyclone/.test(fx)){
  x.strokeStyle='rgba(217,251,255,.95)';x.lineWidth=4+2*p;
  for(let i=0;i<3;i++){const oy=(i-1)*14;const mx=(actorX+targetX)/2+(targetLeft?-1:1)*(18+age*26)*(i-1);x.beginPath();x.moveTo(actorX,actorY+oy);x.quadraticCurveTo(mx,(actorY+targetY)/2-24+oy*.4,targetX,targetY+oy*.3);x.stroke();}
 }
 else if(/guard|earth|bind|forest/.test(fx)){
  cx=actorX;cy=actorY;
  x.strokeStyle=/forest|earth/.test(fx)?'rgba(216,240,176,.96)':'rgba(205,226,255,.96)';x.lineWidth=8;x.beginPath();x.arc(cx,cy,42+age*18,0,Math.PI*2);x.stroke();
  x.globalAlpha*=.65;for(let i=0;i<4;i++){x.beginPath();x.arc(cx,cy,26+i*12+age*8,0,Math.PI*2);x.stroke();}
 }
 else if(/heal|bubble|rainHeal|cloud/.test(fx)){
  cx=actorX;cy=actorY;
  for(let i=0;i<11;i++){x.fillStyle=i%2?'#d8fff1':'#f8fffb';x.beginPath();x.arc(cx+(i%5-2)*18,cy+28-(age*86+i%3*10),5+3*p,0,Math.PI*2);x.fill();}
 }
 else if(/prism|shards|star|orbit/.test(fx)){
  for(let i=0;i<12;i++){const a=i/12*Math.PI*2+age*3.8,r=26+age*66;x.fillStyle=i%3===0?'#fff3a2':i%3===1?'#c9a8ff':'#9fe7ff';x.save();x.translate(targetX+Math.cos(a)*r,targetY+Math.sin(a)*r);x.rotate(a+age);x.fillRect(-(4+3*p),-(4+3*p),(8+6*p),(8+6*p));x.restore();}
 }
 else if(/hurt/.test(fx)){
  for(let i=0;i<4;i++){const dx=(i-1.5)*12;x.strokeStyle='rgba(255,148,148,.95)';x.lineWidth=4+2*p;x.beginPath();x.moveTo(targetX-20+dx,targetY-22);x.lineTo(targetX+10+dx,targetY+16);x.stroke();}
 }
 else{
  x.strokeStyle='rgba(255,249,232,.96)';x.lineWidth=7;x.lineCap='round';
  for(let i=0;i<3;i++){const off=(i-1)*9;x.beginPath();x.moveTo(targetX-34+off,targetY+20);x.lineTo(targetX+22+off,targetY-28);x.stroke();}
  x.strokeStyle='rgba(255,179,131,.9)';x.lineWidth=3+2*p;x.beginPath();x.moveTo(targetX-18,targetY+24);x.lineTo(targetX+30,targetY-18);x.stroke();
 }
 if(action.name&&age<.7){x.globalAlpha=Math.max(0,1-age/.7);x.fillStyle='#fff';x.font='800 18px system-ui';x.textAlign='center';x.fillText(action.name,/guard|earth|bind|forest|heal|bubble|rainHeal|cloud/.test(fx)?actorX:targetX,42);x.textAlign='left';}
 x.restore();
}

function drawHuntMonsterPreviews(t=performance.now()){
 const nodes=[...document.querySelectorAll('#tab-hunt:not(.hunt-running) .hunt-monster-canvas[data-monster-id]')];
 if(!nodes.length)return;
 const frame=Math.floor(t/170)%8;
 for(const c of nodes){
  const id=c.dataset.monsterId;if(!id)continue;
  const rect=c.getBoundingClientRect(),dpr=Math.min(2,window.devicePixelRatio||1),w=Math.max(72,Math.round((rect.width||64)*dpr)),h=Math.max(56,Math.round((rect.height||54)*dpr));
  if(c.width!==w||c.height!==h){c.width=w;c.height=h;}
  const x=c.getContext('2d');x.clearRect(0,0,w,h);x.imageSmoothingEnabled=true;x.imageSmoothingQuality='high';
  const size=Math.min(w*.82,h*.88),bottom=h*.94;drawMonster(x,id,0,'idle',frame,w/2-size/2,bottom-size,size,size,false);
 }
}

function drawRoom(state,t){const pair=ctx2('roomCanvas');if(!pair)return;const [c,x]=pair,w=c.width,h=c.height,pets=window.PetLife.roomPets(state);x.clearRect(0,0,w,h);const roomArt=drawRoomBackdrop(x,state.currentRoom,w,h);const night=state.decor.wallpaper==='wallpaper_night';if(!roomArt){x.fillStyle=night?'#243354':'#7fc9d8';x.fillRect(0,0,w,h*.55);const floor=state.decor.floor;x.fillStyle=floor==='floor_cloud'?'#d8edf0':floor==='floor_wood'?'#b9895e':night?'#374465':'#d8b982';x.fillRect(0,h*.55,w,h*.45);}if(state.decor.rug==='rug_star'){x.fillStyle='#6f5a9e88';x.beginPath();x.ellipse(w*.5,h*.76,130,44,0,0,Math.PI*2);x.fill();}const roomFurniture=state.furniturePlaced.filter(f=>f.room===state.currentRoom).sort((a,b)=>a.y-b.y),windowFurniture=roomFurniture.find(f=>f.id==='window');if(windowFurniture){const rs=state.roomStates?.[state.currentRoom],openBoost=rs?.windowOpen?1.0:.78,fxW=w*.25,fxH=h*.42,fxX=windowFurniture.x*w+w*.08,fxY=windowFurniture.y*h+h*.12;drawAssetCentered(x,'fx','window_light',fxX,fxY,fxW,fxH,{alpha:openBoost});}for(const f of roomFurniture){const logicalW=c._logicalWidth||w/(c._dpr||1),dpr=c._dpr||1,sceneScale=(logicalW/430)*.98*dpr*roomDepthScale(f.y);x.save();x.translate(f.x*w,f.y*h);drawFurniture(x,f.id,sceneScale);x.restore();}pets.forEach((p,i)=>{const v=getVisual(p,i),ra=p.roomAction&&p.roomAction.until>Date.now()?p.roomAction:null,drag=i===0?c._petDrag:null,drop=i===0?c._petDrop:null;const oldX=v.x,oldY=v.y,dt=Math.min(50,Math.max(0,t-(v.lastTick??t)));v.lastTick=t;const cue=window.PetLife.pose(p),social=p.companion?.until>Date.now()?p.companion:null;let dropActive=false,landingScale=1;if(drop&&Number.isFinite(drop.start)){const pr=clamp((t-drop.start)/(drop.duration||520),0,1);if(pr<1){dropActive=true;const fall=Math.min(1,pr*pr*1.22);v.x=drop.x;v.y=drop.fromY+(drop.toY-drop.fromY)*fall;v.tx=drop.x;v.ty=drop.toY;landingScale=pr>.78?1+.12*Math.sin((pr-.78)/.22*Math.PI):1;}else{v.x=drop.x;v.y=drop.toY;v.tx=drop.x;v.ty=drop.toY;c._petDrop=null;c._petLandingUntil=Date.now()+360;c.classList.add('pet-landing-pop');setTimeout(()=>c.classList.remove('pet-landing-pop'),340);}}if(dropActive){v.lastMove=Date.now();}else if(drag?.active){v.tx=clamp(drag.x,.08,.92);v.ty=clamp(drag.y,.16,.82);v.lastMove=Date.now();}else if(social){v.tx=social.x;v.ty=social.y;v.lastMove=Date.now();}else if(cue){v.tx=v.x;v.ty=v.y;v.lastMove=Date.now();}else if(ra){v.tx=ra.x;v.ty=ra.y;v.lastMove=Date.now();}else if(Date.now()-v.lastMove>3500+i*600){v.tx=.24+Math.random()*.52;v.ty=.62+Math.random()*.14;v.lastMove=Date.now();}if(!dropActive){const dx=v.tx-v.x,dy=v.ty-v.y,dist=Math.hypot(dx*w,dy*h),step=drag?.active?1-Math.exp(-dt/45):Math.min(1,(w*.075*dt/1000)/Math.max(.001,dist));v.x=clamp(v.x+dx*step,.08,.92);v.y=clamp(v.y+dy*step,drag?.active?.16:.60,.82);}const stage=p.temporaryRegression?2:p.stage,depth=roomDepthScale(v.y),logicalW=c._logicalWidth||w/(c._dpr||1),dpr=c._dpr||1,size=Math.round(logicalW*window.PetLife.size(stage,.35)*depth*dpr),frame=Math.floor(t/220+i)%6;const foodPanel=document.getElementById('foodDrawer');if(foodPanel?.classList.contains('open')&&!drag?.active){const limit=(foodPanel.offsetTop*dpr-size*.15-10*dpr)/h;v.y=Math.min(v.y,limit);v.ty=Math.min(v.ty,limit);}if(i===0)c._petHit={x:v.x,y:v.y-size*.30/h,rx:(size*.42)/w,ry:(size*.43)/h,size,at:Date.now()};if(state.decor.aura==='aura_spark'){x.strokeStyle='#fff2a688';x.lineWidth=3;x.beginPath();x.arc(v.x*w,v.y*h-size*.28,40+Math.sin(t/180)*4,0,Math.PI*2);x.stroke();}const dx=v.tx-v.x,dy=v.ty-v.y,dir=social&&Math.hypot(dx*w,dy*h)<size*.12?social.dir:Math.abs(dx)>Math.abs(dy)?(dx<0?'left':'right'):(dy<-.015?'up':'down');let anim='idle';if(i===0&&dropActive){anim='surprised';}else if(i===0&&drag?.active){anim='held';}else if(i===0&&c._petCryUntil>Date.now()){anim='cry';}else if(i===0&&c._petHurtUntil>Date.now()){anim='hurt';}else if(i===0&&c._petFoodUntil>Date.now()){anim='eat';}else if(i===0&&c._petHappyUntil>Date.now()){anim='happy';}else if(cue&&(!social||Math.hypot(dx*w,dy*h)<size*.12)){anim=cue==='faint'&&Date.now()-p.presentation.at>780?'faint_idle':cue;}else if(ra&&Math.hypot(dx*w,dy*h)<size*.12){anim=ra.id==='bed'&&/잠/.test(ra.action)?'sleep':/먹|간식/.test(ra.action)?'eat':/눕|뒹굴/.test(ra.action)?'lie':'interact';}else if(Math.hypot(v.x-oldX,v.y-oldY)>.00001)anim='walk';x.save();if(i===0&&c._petImpactUntil>Date.now()){x.translate(Math.sin(t/18)*11,-4);x.rotate(Math.sin(t/24)*.055);}if(i===0&&c._petScoldUntil>Date.now()){x.translate(Math.sin(t/20)*7,Math.cos(t/26)*3);x.rotate(Math.sin(t/20)*.035);}if(i===0&&drag?.active){x.translate(0,-10-Math.sin(t/90)*2);x.scale(1.025,.975);}if(i===0&&dropActive){const cx=v.x*w,cy=v.y*h-size*.30;x.translate(cx,cy);x.scale(landingScale,1/landingScale);x.translate(-cx,-cy);}if(i===0&&c._petLandingUntil>Date.now()){const cx=v.x*w,cy=v.y*h-size*.30;x.translate(cx,cy+Math.sin(t/35)*2);x.scale(1.07,.93);x.translate(-cx,-cy);}if(i===0&&c._petPlayUntil>Date.now()){const now=Date.now(),start=c._petPlayStart||now,end=c._petPlayEnd||c._petPlayUntil||now+1,duration=Math.max(1,end-start),phase=clamp((now-start)/duration,0,1);if(!c._petPlayScene)c._petPlayScene={left:Math.max(.18,v.x-.18),right:Math.min(.82,v.x+.18),baseY:clamp(v.y,.64,.76)};const scene=c._petPlayScene;const lane=[[scene.left,scene.baseY],[scene.right,scene.baseY-.01],[scene.left+.05,scene.baseY+.005],[scene.right-.04,scene.baseY-.008],[scene.left+.08,scene.baseY]];const seg=(lane.length-1)*phase,idx=Math.min(lane.length-2,Math.floor(seg)),u=seg-idx,[x0,y0]=lane[idx],[x1,y1]=lane[idx+1],px=x0+(x1-x0)*u,py=y0+(y1-y0)*u;v.x=px;v.y=py;v.tx=px;v.ty=py;const playDir=x1>=x0?'right':'left';const hop=Math.abs(Math.sin(phase*Math.PI*8))*size*.06;x.translate(0,-hop);anim='walk';drawPet(x,p,anim,playDir,Math.floor(t/95)+i,v.x*w-size/2,v.y*h-size*.8,size,size,null,{x:v.x*w,y:v.y*h});x.restore();const bx=(scene.left+(scene.right-scene.left)*(phase<.5?phase*2:(1-phase)*2))*w,by=v.y*h-size*.08-Math.abs(Math.sin(phase*Math.PI*6))*size*.20;x.save();x.fillStyle='#ffd86b';x.strokeStyle='#8a654a';x.lineWidth=Math.max(2,2*dpr);x.beginPath();x.arc(bx,by,size*.075,0,Math.PI*2);x.fill();x.stroke();x.fillStyle='#f08aa0';x.beginPath();x.arc(bx-size*.022,by-size*.018,size*.018,0,Math.PI*2);x.fill();x.restore();}else{if(i===0&&c._petPlayScene)delete c._petPlayScene;drawPet(x,p,anim,dir,Math.floor(t/(anim==='walk'?120:190))+i,v.x*w-size/2,v.y*h-size*.8,size,size,null,{x:v.x*w,y:v.y*h});x.restore();}if(i>0){x.save();x.font=`${Math.max(11,12*dpr)}px system-ui`;x.textAlign='center';x.fillStyle='#493e37';x.fillText(p.name,v.x*w,v.y*h+size*.17);if(p._voice&&Date.now()-p._voice.at<4000){const msg=p._voice.text;x.font=`${12*dpr}px system-ui`;const tw=Math.min(w*.65,x.measureText(msg).width+16*dpr),bx=clamp(v.x*w-tw/2,4,w-tw-4),by=v.y*h-size*.82;x.fillStyle='#fffaf0';x.fillRect(bx,by-20*dpr,tw,26*dpr);x.fillStyle='#493e37';x.fillText(msg,bx+tw/2,by,tw-8*dpr);}x.restore();}if(i===0&&c._petLandingUntil>Date.now()){const lp=1-(c._petLandingUntil-Date.now())/360;x.save();x.globalAlpha=Math.max(0,1-lp);x.fillStyle='#fff0cf';for(let q=0;q<5;q++){const a=(q-2)*.55,r=14+lp*34;x.beginPath();x.arc(v.x*w+Math.sin(a)*r,v.y*h-4-Math.cos(a)*r*.15,3+q%2,0,Math.PI*2);x.fill();}x.restore();}if(i===0){const speech=document.getElementById('petSpeech');if(speech){const rect=c.getBoundingClientRect(),scale=Math.max(rect.width/w,rect.height/h),drawW=w*scale,drawH=h*scale,offX=(rect.width-drawW)/2,offY=(rect.height-drawH)/2,anchorX=offX+v.x*w*scale,anchorY=offY+(v.y*h-size*.78)*scale;speech.style.left=`${clamp(anchorX,72,rect.width-72)}px`;speech.style.top=`${clamp(anchorY,72,rect.height-52)}px`;}}if(ra){if(ra.id==='ball'){const bounce=Math.abs(Math.sin(t/110))*34;x.fillStyle='#ffd369';x.beginPath();x.arc(v.x*w+42,v.y*h-20-bounce,12,0,Math.PI*2);x.fill();}if(ra.id==='bed'&&/잠/.test(ra.action)){x.font='800 18px system-ui';x.fillText('Z z',v.x*w+36,v.y*h-85);}if(ra.id==='wardrobe'&&/열/.test(ra.action)){x.fillStyle='#fff4b8';x.fillRect(0,0,1,1);}}});x.textAlign='left';}
function drawFieldObject(x,obj,w,h){if(!obj)return;const px=obj.x*w,py=obj.y*h;if(drawAssetCentered(x,'objects',obj.name,px,py,72,72))return;x.fillStyle='#ffffff33';x.beginPath();x.arc(px,py,18,0,Math.PI*2);x.fill();x.fillStyle='#fff';x.font='12px system-ui';x.textAlign='center';x.fillText(obj.name,px,py+34);x.textAlign='left';}
function drawStudy(state,t){const pair=ctx2('studyCanvas');if(!pair)return;const [c,x]=pair,p=mainPet(state);if(!p){x.clearRect(0,0,c.width,c.height);return;}const w=c.width,h=c.height;const roomArt=drawRoomBackdrop(x,'study',w,h)||drawRoomBackdrop(x,state.currentRoom,w,h);if(!roomArt){x.fillStyle='#bfe3d5';x.fillRect(0,0,w,h*.58);x.fillStyle='#e7cfaa';x.fillRect(0,h*.58,w,h*.42);x.fillStyle='#fff9e8';x.fillRect(w*.10,h*.12,w*.25,h*.25);x.fillStyle='#87bdd7';x.fillRect(w*.12,h*.14,w*.21,h*.21);x.fillStyle='#c69a6d';x.fillRect(w*.60,h*.52,w*.26,h*.08);x.fillRect(w*.64,h*.60,w*.04,h*.18);x.fillRect(w*.80,h*.60,w*.04,h*.18);}const bob=Math.sin(t/420)*3,look=Math.sin(t/1250),walk=Math.sin(t/2300),px=w*(.48+walk*.12),stage=p.temporaryRegression?2:p.stage,logicalW=c._logicalWidth||w/(c._dpr||1),dpr=c._dpr||1,ps=Math.round(logicalW*window.PetLife.size(stage,.32)*dpr);drawPet(x,p,window.PetLife.pose(p)||'walk',Math.cos(t/2300)<0?'left':'right',Math.floor(t/150),px-ps/2,h*.72-ps,ps,ps,null,{x:px,y:h*.72});x.fillStyle='rgba(255,255,255,.24)';for(let i=0;i<8;i++){const px=(i*137+t/45)%w,py=70+(i%4)*78;x.fillRect(px,py,3,3);}}
const huntVisual={zone:'',pet:null,camera:null,enemies:new Map(),objects:new Map(),chests:new Map(),drops:new Map()};
function easeHuntPos(store,key,item,t,duration=1080){
 if(!item)return null;let v=store instanceof Map?store.get(key):store;
 if(!v){v={x:item.x,y:item.y,fromX:item.x,fromY:item.y,toX:item.x,toY:item.y,start:t};if(store instanceof Map)store.set(key,v);}
 if(Math.abs(v.toX-item.x)>.0001||Math.abs(v.toY-item.y)>.0001){const p=Math.min(1,Math.max(0,(t-v.start)/duration)),e=1-Math.pow(1-p,3);v.x=v.fromX+(v.toX-v.fromX)*e;v.y=v.fromY+(v.toY-v.fromY)*e;v.fromX=v.x;v.fromY=v.y;v.toX=item.x;v.toY=item.y;v.start=t;}
 const p=Math.min(1,Math.max(0,(t-v.start)/duration)),e=1-Math.pow(1-p,3);v.x=v.fromX+(v.toX-v.fromX)*e;v.y=v.fromY+(v.toY-v.fromY)*e;return v;
}
function resetHuntVisual(zone,f,t){huntVisual.zone=zone;huntVisual.enemies.clear();huntVisual.objects.clear();huntVisual.chests.clear();huntVisual.drops.clear();huntVisual.pet={x:f.pet.x,y:f.pet.y,fromX:f.pet.x,fromY:f.pet.y,toX:f.pet.x,toY:f.pet.y,start:t};huntVisual.camera={x:f.camera.x,y:f.camera.y,fromX:f.camera.x,fromY:f.camera.y,toX:f.camera.x,toY:f.camera.y,start:t};}
function huntWorldBounds(z){const dims={yard:[6.4,10.4],forest:[6.1,9.8],cave:[6.0,9.9],ruin:[6.0,9.8],lab:[6.3,10.4],deep:[6.0,10.2]}[z.id]||[6.2,10.0],mx=.18,my=.20;return {minX:-dims[0]/2,maxX:dims[0]/2,minY:-dims[1]/2,maxY:dims[1]/2,marginX:mx,marginY:my,width:dims[0],height:dims[1]};}
function drawHuntTerrain(x,img,w,h,cam,scale,z){
 if(!(img&&img.complete&&img.naturalWidth&&img.naturalHeight))return false;
 const bounds=huntWorldBounds(z),dx=w*.5+(bounds.minX-cam.x)*scale,dy=h*.61+(bounds.minY-cam.y)*scale,dw=bounds.width*scale,dh=bounds.height*scale;
 x.save();x.imageSmoothingEnabled=false;x.drawImage(img,dx,dy,dw,dh);x.restore();return true;
}
function drawHuntWorldFx(x,action,sx,sy,t){
 if(!action||!Number.isFinite(action.targetX)||Date.now()-action.at>850)return;
 const age=(Date.now()-action.at)/850,p=1-age,cx=sx(action.targetX),cy=sy(action.targetY);x.save();x.globalAlpha=Math.max(0,p);
 if(action.kind==='discover'){x.fillStyle='#fff5b8';x.strokeStyle='#8d6422';x.lineWidth=3;x.beginPath();x.arc(cx,cy-62,23+Math.sin(t/90)*2,0,Math.PI*2);x.fill();x.stroke();x.fillStyle='#714d18';x.font='900 26px system-ui';x.textAlign='center';x.fillText('!',cx,cy-53);}
 else if(action.kind==='hurt'||action.kind==='bossAttack'){x.strokeStyle='#ff8d8d';x.lineWidth=7*p+2;x.beginPath();x.arc(cx,cy-20,28+age*46,0,Math.PI*2);x.stroke();}
 else if(action.kind==='loot'||action.kind==='bossWin'){for(let i=0;i<10;i++){const a=i/10*Math.PI*2,r=20+age*55;x.fillStyle=i%2?'#fff3a2':'#b9f5ff';x.fillRect(cx+Math.cos(a)*r-3,cy-18+Math.sin(a)*r-3,6,6);}}
 else{x.strokeStyle='#fff4cf';x.lineWidth=8*p+2;x.beginPath();x.moveTo(cx-34-age*12,cy+20);x.lineTo(cx+34+age*12,cy-28);x.stroke();x.strokeStyle='#ff9b8b';x.lineWidth=4*p+1;x.beginPath();x.moveTo(cx-22,cy+31);x.lineTo(cx+42,cy-18);x.stroke();}
 if(action.name&&age<.72){x.globalAlpha=Math.max(0,1-age/.72);x.fillStyle='#fff';x.font='800 16px system-ui';x.textAlign='center';x.shadowColor='#000';x.shadowBlur=4;x.fillText(action.name,cx,cy-66);}
 x.restore();
}
function drawHunt(state,t){
 const pair=ctx2('huntCanvas');if(!pair)return;const [c,x]=pair,p=mainPet(state);if(!p){x.clearRect(0,0,c.width,c.height);return;}
 const z=zones.find(v=>v.id===state.hunt.zone)||zones[0],w=c.width,h=c.height,f=state.hunt.field||{};
 x.clearRect(0,0,w,h);
 if(!state.hunt.running){
  const preview=getAsset('hunt',z.id);
  if(preview&&preview.complete&&preview.naturalWidth&&preview.naturalHeight){const sc=Math.max(w/preview.naturalWidth,h/preview.naturalHeight),sw=w/sc,sh=h/sc,ix=(preview.naturalWidth-sw)/2,iy=(preview.naturalHeight-sh)/2;x.save();x.imageSmoothingEnabled=false;x.drawImage(preview,ix,iy,sw,sh,0,0,w,h);x.restore();}
  else{x.fillStyle='#79b96c';x.fillRect(0,0,w,h);}
  x.fillStyle='rgba(248,252,238,.88)';x.fillRect(w*.12,h*.42,w*.76,h*.13);x.fillStyle='#536458';x.textAlign='center';x.font=`700 ${Math.max(16,w*.03)}px system-ui`;x.fillText('사냥터를 고르고 탐험을 시작해',w/2,h*.49);x.textAlign='left';return;
 }
 if(!f.pet)f.pet={x:0,y:0,state:'idle',dir:'right'};if(!f.camera)f.camera={x:f.pet.x,y:f.pet.y};if(huntVisual.zone!==z.id||!huntVisual.pet)resetHuntVisual(z.id,f,t);
 const petV=easeHuntPos(huntVisual.pet,'pet',f.pet,t,95),camV=easeHuntPos(huntVisual.camera,'camera',f.camera,t,210),rawCam=camV||f.camera,pet={...f.pet,x:petV.x,y:petV.y};const petMoveDx=petV.x-(huntVisual.lastPetDrawX??petV.x),petMoveDy=petV.y-(huntVisual.lastPetDrawY??petV.y);huntVisual.lastPetDrawX=petV.x;huntVisual.lastPetDrawY=petV.y;
 const scale=Math.max(170,Math.min(w,h)*.255),bounds=huntWorldBounds(z),halfX=w/(2*scale),topReach=h*.61/scale,bottomReach=h*.39/scale;
 const edge=.10,cam={x:clamp(rawCam.x,bounds.minX+halfX+edge,bounds.maxX-halfX-edge),y:clamp(rawCam.y,bounds.minY+topReach+edge,bounds.maxY-bottomReach-edge)};
 const sx=wx=>w*.5+(wx-cam.x)*scale,sy=wy=>h*.61+(wy-cam.y)*scale;
 const bg={yard:'#6eae58',forest:'#477e49',cave:'#424b56',ruin:'#827a69',lab:'#58727b',deep:'#433e5a'}[z.id]||'#6eae58';x.fillStyle=bg;x.fillRect(0,0,w,h);
 const huntImg=getAsset('hunt',z.id);drawHuntTerrain(x,huntImg,w,h,cam,scale,z);
 const petStage=p.temporaryRegression?2:p.stage,logicalW=c._logicalWidth||w/(c._dpr||1),dpr=c._dpr||1,petSize=Math.round(Math.max(92,Math.min(116,logicalW*(petStage===0?.245:.215)))*dpr);
 const objectScale={tree:1.75,well:1.34,bridge:1.48,cave:1.45,gate:1.36,dummy:1.05,fence:1.12,sign:.90,rock:.94,crystal:.95,lamp:.90,bush:.88,flowers:.72};
 const enemyScale={spar:.90,green_slime:.92,mushroom:.95,fox:.94,golem:1.15,shadowbat:.93,scarab:.96,shellbug:1.02,firemage:.97,minotaur:1.13,leafling:.94,drone:.98};
 const renderables=[];
 const drawObj=o=>{const px=sx(o.x),py=sy(o.y);if(px<-150||px>w+150||py<-170||py>h+170)return;const k=o.kind||'',depth=clamp(.76+(py/h)*.30,.76,1.05),size=petSize*(objectScale[k]||.94)*(o.scale||1)*depth;x.save();x.globalAlpha=.18;x.fillStyle='#304b35';x.beginPath();x.ellipse(px,py+size*.03,size*.25,size*.065,0,0,Math.PI*2);x.fill();x.globalAlpha=1;drawAssetCentered(x,'objects',k,px,py-size*.30,size,size);x.restore();};
 for(const o of f.objects||[])renderables.push({y:o.y,draw:()=>drawObj(o)});
 for(const ch of f.chests||[]){if(ch.opened)continue;renderables.push({y:ch.y,draw:()=>{const px=sx(ch.x),py=sy(ch.y);if(px<-120||px>w+120||py<-120||py>h+120)return;const depth=clamp(.78+(py/h)*.28,.78,1.05),size=petSize*(ch.rarity==='rare'?1.22:1.12)*depth,bob=Math.sin(t/180+ch.glow)*.45;x.save();x.globalAlpha=.22;x.fillStyle='#3b4e31';x.beginPath();x.ellipse(px,py+size*.025,size*.32,size*.075,0,0,Math.PI*2);x.fill();x.globalAlpha=1;if(ch.rarity==='rare'){x.shadowColor='#ffe99a';x.shadowBlur=18+Math.sin(t/160)*5;}drawAsset(x,'objects','chest',px-size/2,py-size*(141/192)+bob,size,size);x.restore();if(ch.discoveredAt&&Date.now()-ch.discoveredAt<1500){x.fillStyle='#fff7cd';x.strokeStyle='#8d6422';x.lineWidth=3;x.beginPath();x.arc(px,py-size*.82,17,0,Math.PI*2);x.fill();x.stroke();x.fillStyle='#704b16';x.font='900 19px system-ui';x.textAlign='center';x.fillText('!',px,py-size*.76);}}});}
 for(const d of f.drops||[]){const dk=d.id||`${d.kind}:${d.x}:${d.y}`,dv=easeHuntPos(huntVisual.drops,dk,d,t,240);renderables.push({y:dv.y-.02,draw:()=>{const px=sx(dv.x),py=sy(dv.y);if(px<-70||px>w+70||py<-70||py>h+70)return;const size=petSize*.40,bob=Math.sin(t/115)*4;x.save();x.shadowColor=d.rare?'#ffe68c':'#d8fff0';x.shadowBlur=d.rare?18:9;drawAssetCentered(x,'items',d.kind,px,py-size*.26+bob,size,size);x.restore();}});}
 const enemies=f.enemies||[];
 for(let i=0;i<enemies.length;i++){const e=enemies[i],ev=easeHuntPos(huntVisual.enemies,e.uid||i,e,t,115);renderables.push({y:ev.y,draw:()=>{const px=sx(ev.x),py=sy(ev.y);if(px<-150||px>w+150||py<-150||py>h+150)return;const depth=clamp(.80+(py/h)*.25,.80,1.07),size=petSize*(enemyScale[e.id]||.94)*(e.boss?1.36:1)*depth,now=Date.now(),near=Math.hypot((ev.x??e.x)-pet.x,(ev.y??e.y)-pet.y)<.52;let state=now<(e.hitPoseUntil||0)?'hit':now<(e.attackPoseUntil||0)?'attack':near?'idle':'walk';const prevX=ev._lastDrawX??ev.x,moveDx=ev.x-prevX;ev._lastDrawX=ev.x;const faceRight=(state==='attack'||state==='hit')?pet.x>ev.x:(Math.abs(moveDx)>.001?moveDx>0:(e.dir==='left'?false:e.dir==='right'?true:pet.x>ev.x));x.save();x.globalAlpha=.25;x.fillStyle='#27382c';x.beginPath();x.ellipse(px,py+size*.025,size*.28,size*.07,0,0,Math.PI*2);x.fill();x.restore();if(e.boss){x.save();x.strokeStyle='#ffdc82';x.lineWidth=5;x.globalAlpha=.48+.22*Math.sin(t/160);x.beginPath();x.arc(px,py-size*.38,size*.46,0,Math.PI*2);x.stroke();x.restore();}drawMonster(x,e.id,0,state,state==='attack'?Math.floor((now-e.attackPoseUntil+430)/54):state==='hit'?Math.floor((now-e.hitPoseUntil+300)/38):Math.floor(t/135),px-size/2,py-size*(176/192),size,size,!faceRight);const bw=size*(e.boss?.78:.68);x.fillStyle='#19202cbb';x.fillRect(px-bw/2,py-size*.86,bw,6);x.fillStyle=e.boss?'#f0b14e':'#ff7e83';x.fillRect(px-bw/2,py-size*.86,bw*Math.max(0,e.hp/e.maxHp),6);}});}
 renderables.push({y:pet.y,draw:()=>{const now=Date.now(),target=enemies.length?nearestRenderable(enemies,pet):null;let anim=now<(pet.dodgeUntil||0)?'dodge':now<(pet.hurtUntil||0)?'hurt':now<(pet.celebrateUntil||0)?'happy':pet.state==='chase'?'run':pet.state==='attack'?(h.lastAction?.kind==='skill'&&now-h.lastAction.at<660?'skill':'attack'):pet.state==='interact'?'interact':pet.state==='rest'?'sleep':['walk','wander','pickup','inspect'].includes(pet.state)?'walk':'idle';let dir=pet.dir||'right';if(target&&(anim==='attack'||anim==='hurt')){const dx=target.x-pet.x,dy=target.y-pet.y;dir=Math.abs(dy)>Math.abs(dx)?(dy<0?'up':'down'):(dx<0?'left':'right');}else if((anim==='walk'||anim==='run')&&(Math.abs(petMoveDx)+Math.abs(petMoveDy)>.0005)){dir=Math.abs(petMoveDy)>Math.abs(petMoveDx)?(petMoveDy<0?'up':'down'):(petMoveDx<0?'left':'right');}const ppx=sx(pet.x),ppy=sy(pet.y),bob=anim==='walk'||anim==='run'?Math.sin(t/(anim==='run'?75:105))*1.8:0,ps=window.PetLife.size(petStage,petSize);x.save();x.globalAlpha=.24;x.fillStyle='#2e4534';x.beginPath();x.ellipse(ppx,ppy+ps*.035,ps*.27,ps*.07,0,0,Math.PI*2);x.fill();x.restore();drawPet(x,p,anim,dir,Math.floor(t/(anim==='run'?90:anim==='attack'?95:anim==='hurt'?110:150)),ppx-ps/2,ppy-ps*.76,ps,ps,null,{x:pet.x*scale,y:pet.y*scale});}});
 renderables.sort((a,b)=>a.y-b.y).forEach(r=>r.draw());
 {const a=state.hunt.lastAction;if(!(a&&Number.isFinite(a.targetX)&&drawPetElementFx(x,p,a,sx(a.targetX),sy(a.targetY)-petSize*.3,petSize*1.25,a.targetX<f.pet.x)))drawHuntWorldFx(x,a,sx,sy,t);}
 if(f.bossWarning>0){x.fillStyle='#271b2c88';x.fillRect(0,0,w,h);x.textAlign='center';x.fillStyle='#ffe7a2';x.font=`800 ${Math.max(21,w*.043)}px system-ui`;x.fillText('⚠️ 위험한 기척',w/2,h*.31);x.font=`700 ${Math.max(14,w*.026)}px system-ui`;x.fillStyle='#fff';x.fillText('강한 몬스터가 앞길에 나타난다!',w/2,h*.36);}
 x.textAlign='left';
}
function nearestRenderable(list,p){let b=null,d=Infinity;for(const v of list){const n=Math.hypot(v.x-p.x,v.y-p.y);if(n<d){d=n;b=v;}}return b;}
function drawBattleImpactFx(ctx,b,w,sceneH,t){
 const a=b?.lastAction;if(!a||!a.at)return;const age=Date.now()-a.at;if(age<0||age>620)return;
 const p=age/620,fromPlayer=a.side!=='enemy',cx=fromPlayer?w*.73:w*.25,cy=sceneH*.55;
 ctx.save();ctx.globalAlpha=Math.max(0,1-p);
 if(['attack','skill','ult','ultimate'].includes(a.kind)){
  const ring=20+p*58;ctx.strokeStyle=fromPlayer?'rgba(255,235,166,.95)':'rgba(255,150,147,.92)';ctx.lineWidth=Math.max(3,w*.007)*(1-p*.45);ctx.beginPath();ctx.arc(cx,cy,ring,0,Math.PI*2);ctx.stroke();
  for(let i=0;i<9;i++){const ang=(i/9)*Math.PI*2+(fromPlayer?-.2:.2),r=18+p*(48+(i%3)*13);ctx.strokeStyle=i%2?'rgba(255,255,240,.92)':'rgba(255,188,119,.9)';ctx.lineWidth=Math.max(2,w*.004);ctx.beginPath();ctx.moveTo(cx+Math.cos(ang)*r*.28,cy+Math.sin(ang)*r*.18);ctx.lineTo(cx+Math.cos(ang)*r,cy+Math.sin(ang)*r*.62);ctx.stroke();}
  if(a.kind==='skill'||a.kind==='ult'||a.kind==='ultimate'){ctx.globalAlpha=Math.max(0,.58-p*.58);ctx.fillStyle=fromPlayer?'#fff2a8':'#ffc4bd';ctx.beginPath();ctx.arc(cx,cy,Math.max(8,w*.025)*(1-p*.35),0,Math.PI*2);ctx.fill();}
 }
 if(a.kind==='hurt'||a.kind==='bossAttack'){ctx.strokeStyle='rgba(255,112,112,.9)';ctx.lineWidth=Math.max(3,w*.006);for(let i=0;i<3;i++){ctx.beginPath();ctx.moveTo(cx-28+i*18,cy-28);ctx.lineTo(cx+8+i*18,cy+18);ctx.stroke();}}
 ctx.restore();
}
function drawBattle(state,t){
 const pair=ctx2('battleCanvas');if(!pair)return;const [c,x]=pair,p=mainPet(state);if(!p){x.clearRect(0,0,c.width,c.height);return;}
 const b=state.battle,w=c.width,h=c.height,logicalW=c._logicalWidth||w/(c._dpr||1),dpr=c._dpr||1,temp=b.tempEvolution,visualPet=temp?{...p,starter:temp.starter,stage:1}:p;
 x.clearRect(0,0,w,h);
 const sceneH=Math.round(h*.88),last=b.lastAction,impactAge=last?.at?Date.now()-last.at:9999,impacting=impactAge>=0&&impactAge<420&&['attack','skill','ult','ultimate','hurt','bossAttack'].includes(last?.kind),power=last?.kind==='ult'||last?.kind==='ultimate'?1.8:last?.kind==='skill'?1.35:1;
 const shakeAmp=impacting?Math.max(2,logicalW*.010)*power*(1-impactAge/420):0,shakeX=shakeAmp?Math.sin(t*.105)*shakeAmp:0,shakeY=shakeAmp?Math.cos(t*.137)*shakeAmp*.45:0;
 x.save();if(state.settings?.motion!==false)x.translate(shakeX,shakeY);
 const roomOk=drawRoomBackdrop(x,'battle_room',w,sceneH);if(!roomOk){x.fillStyle='#6d7d83';x.fillRect(0,0,w,sceneH);} 
 x.fillStyle='rgba(28,39,48,.10)';x.fillRect(0,0,w,sceneH);x.fillStyle='#f6efe5';x.fillRect(0,sceneH,w,h-sceneH);
 const frame=Math.floor(t/120),stage=temp?1:(p.temporaryRegression?2:p.stage),base=Math.round(logicalW*window.PetLife.size(stage,.27)*dpr),sz=b.awakened?Math.round(base*1.16):base;
 const recent=b.lastAction&&Date.now()-b.lastAction.at<700,bAnim=!b.running&&Date.now()-(b.endedAt||0)<3500?b.outcome:recent&&b.lastAction.side==='enemy'?'hurt':recent?(b.lastAction.kind==='skill'||b.lastAction.kind==='ultimate'||b.lastAction.kind==='ult'?'skill':b.lastAction.kind==='attack'?'attack':'idle'):'idle';
 const groundY=sceneH*.70,petX=w*.25,enemyX=w*.73;
 // Contact shadows ground both characters in the arena.
 x.save();x.fillStyle='rgba(42,48,49,.22)';x.beginPath();x.ellipse(petX,groundY+sz*.015,sz*.30,sz*.075,0,0,Math.PI*2);x.fill();x.restore();
 const petIdlePose=stage===0&&bAnim==='idle'?'walk':bAnim,petFrame=stage===0&&bAnim==='idle'?0:frame;
 const petGroundFactor=stage===0?.785:.885;drawPet(x,visualPet,petIdlePose,'right',petFrame,petX-sz/2,groundY-sz*petGroundFactor,sz,sz,b.awakened?4:(temp?1:null));
 const battleMonsterRows=['spar','green_slime','mushroom','fox','golem','shadowbat','scarab','shellbug','firemage','minotaur','leafling','drone'];const row=Math.max(0,battleMonsterRows.indexOf(b.enemyId));
 const enemyScaleMap={spar:.42,green_slime:.44,mushroom:.45,fox:.46,golem:.60,shadowbat:.46,scarab:.47,shellbug:.49,firemage:.49,minotaur:.58,leafling:.48,drone:.49};
 const widthBased=logicalW*(enemyScaleMap[b.enemyId]||.46)*dpr,heightCap=sceneH*.66,enemySize=Math.round(Math.min(widthBased,heightCap,w*.43));
 let enemyAnim='idle';if(!b.running&&b.enemyHp<=0)enemyAnim='death';else if(recent&&b.lastAction?.side==='enemy')enemyAnim=b.lastAction.kind==='skill'?'skill':b.lastAction.kind==='attack'?'attack':'idle';else if(recent&&b.lastAction?.side==='player'&&['attack','skill','ult','ultimate'].includes(b.lastAction.kind))enemyAnim='hit';
 const enemyFrame=enemyAnim==='death'?Math.floor((Date.now()-(b.endedAt||Date.now()))/130):['attack','skill','hit'].includes(enemyAnim)?Math.floor((Date.now()-b.lastAction.at)/87.5):frame;
 x.save();x.fillStyle='rgba(42,48,49,.25)';x.beginPath();x.ellipse(enemyX,groundY+enemySize*.018,enemySize*.31,enemySize*.078,0,0,Math.PI*2);x.fill();x.restore();
 // Monster is on the right, so flip to face left toward the pet.
 drawMonster(x,b.enemyId,row,enemyAnim,enemyFrame,enemyX-enemySize/2,groundY-enemySize*.93,enemySize,enemySize,true);
 if(b.awakened){x.strokeStyle='#d8a7ff';x.lineWidth=Math.max(2,3*dpr);x.beginPath();x.arc(petX,groundY-sz*.36,sz*.48,0,Math.PI*2);x.stroke();}
 if(b.awakenFxUntil&&Date.now()<b.awakenFxUntil){const remain=b.awakenFxUntil-Date.now(),phase=1-remain/1800;x.save();x.fillStyle=`rgba(24,12,42,${.22+.28*Math.sin(phase*Math.PI)})`;x.fillRect(0,0,w,sceneH);const zoom=Math.round(base*(1.15+Math.sin(phase*Math.PI)*.22));drawPet(x,p,'victory','down',Math.floor(t/90),w/2-zoom/2,sceneH/2-zoom*.58,zoom,zoom,4);x.restore();}
 if(b.tempEvolutionFxUntil&&Date.now()<b.tempEvolutionFxUntil&&temp){const remain=b.tempEvolutionFxUntil-Date.now(),phase=1-remain/1600;x.save();x.fillStyle=`rgba(255,241,184,${.16+.30*Math.sin(phase*Math.PI)})`;x.fillRect(0,0,w,sceneH);const zoom=Math.round(base*(1.20+Math.sin(phase*Math.PI)*.18));drawPet(x,visualPet,'victory','down',Math.floor(t/90),w/2-zoom/2,sceneH/2-zoom*.56,zoom,zoom,1);x.fillStyle='#fff';x.shadowColor='rgba(50,35,20,.45)';x.shadowBlur=8*dpr;x.font=`900 ${Math.max(17,logicalW*.042)*dpr}px system-ui`;x.textAlign='center';x.fillText(`임시진화 · ${temp.name}`,w/2,sceneH*.22);x.textAlign='left';x.restore();}
 if(!(b.lastAction?.side==='player'&&drawPetElementFx(x,visualPet,b.lastAction,w*.64,sceneH*.48,base*1.15)))drawActionFx(x,b.lastAction,w,sceneH,'left');
 drawBattleImpactFx(x,b,w,sceneH,t);
 if(!b.running&&!b.endedAt){x.fillStyle='rgba(255,250,239,.92)';x.fillRect(w*.15,sceneH*.56,w*.70,Math.max(42,logicalW*.11)*dpr);x.fillStyle='#5e625f';x.textAlign='center';x.font=`800 ${Math.max(15,logicalW*.035)*dpr}px system-ui`;x.fillText('배틀 시작을 누르면 자동 전투가 시작돼',w/2,sceneH*.615);x.textAlign='left';}
 x.restore();
}
function drawAmbientScene(canvasId,state,t,kind){
 const pair=ctx2(canvasId);if(!pair)return;const [c,x]=pair,p=mainPet(state),w=c.width,h=c.height;x.clearRect(0,0,w,h);
 const roomByKind={shop:'living',explore:'garden',pets:'living',record:'study',events:'playground',more:'living'},room=roomByKind[kind]||'living';
 if(!drawRoomBackdrop(x,room,w,h)){const fill={shop:'#d9eadf',explore:'#9bcf84',pets:'#ead8bf',record:'#d9e4ef',events:'#f1d8a9',more:'#e7ddcf'}[kind]||'#e7ddcf';x.fillStyle=fill;x.fillRect(0,0,w,h);}
 x.save();x.fillStyle='rgba(255,255,255,.08)';x.fillRect(0,0,w,h);x.restore();
 if(!p)return;const stage=p.temporaryRegression?2:p.stage,logicalW=c._logicalWidth||w/(c._dpr||1),dpr=c._dpr||1,size=Math.round(logicalW*window.PetLife.size(stage,.24)*dpr),cx=w*.52,ground=h*.79,bob=Math.sin(t/330)*1.5;drawPet(x,p,'idle','right',Math.floor(t/180),cx-size/2,ground-size*.76+bob,size,size);
} 

function drawAllScenesOnce(state,t=performance.now()){
 const safeDraw=fn=>{try{fn();}catch(err){console.warn('[scene draw recovered]',err);}};
 const tab=state?.ui?.tab||'home';
 if(tab==='home')safeDraw(()=>drawRoom(state,t));
 else if(tab==='study')safeDraw(()=>drawStudy(state,t));
 else if(tab==='hunt'){safeDraw(()=>drawHunt(state,t));if(!state.hunt?.running)safeDraw(()=>drawHuntMonsterPreviews(t));}
 else if(tab==='battle')safeDraw(()=>drawBattle(state,t));
 else if(tab==='shop')safeDraw(()=>drawAmbientScene('shopSceneCanvas',state,t,'shop'));
 else if(tab==='explore')safeDraw(()=>drawAmbientScene('exploreSceneCanvas',state,t,'explore'));
 else if(tab==='pets')safeDraw(()=>drawAmbientScene('petsSceneCanvas',state,t,'pets'));
 else if(tab==='record')safeDraw(()=>drawAmbientScene('recordSceneCanvas',state,t,'record'));
 else if(tab==='events')safeDraw(()=>drawAmbientScene('eventsSceneCanvas',state,t,'events'));
 else if(tab==='more')safeDraw(()=>drawAmbientScene('moreSceneCanvas',state,t,'more'));
}
function animateCanvases(state){let last=0;const redraw=()=>{renderPetProxies(state);drawAllScenesOnce(state,performance.now());};window.addEventListener('mathpet:asset-ready',redraw);window.addEventListener('resize',redraw,{passive:true});document.addEventListener('visibilitychange',()=>{if(!document.hidden)redraw();});function loop(t){if(document.hidden){requestAnimationFrame(loop);return;}const fps=state.settings.quality==='low'?24:state.settings.quality==='high'?60:40;if(t-last>=1000/fps-1){last=t;drawAllScenesOnce(state,t);}requestAnimationFrame(loop);}redraw();requestAnimationFrame(loop);}


// ===== ui.js =====
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const iconMarkup=(id,fallback='✦',kind='items')=>{const src=kind==='furniture'?assetPath('furniture',id):kind==='items'?itemIconPath(id):assetPath(kind,id);return `<span class="asset-thumb">${src?`<img src="${src}" alt="" onload="this.nextElementSibling.style.display='none'" onerror="this.remove()">`:''}<span>${fallback}</span></span>`;};
const shopDecorPreview=it=>{
 if(it.kind!=='decor')return iconMarkup(it.id,'✨','items');
 const key=(it.slot||'')+' '+(it.id||'')+' '+(it.name||'');
 if(it.slot==='wallpaper'||/wallpaper|벽지/.test(key))return `<span class="decor-preview decor-wallpaper-night" aria-hidden="true"><i></i><u></u><b></b></span>`;
 if(it.slot==='aura'||/aura|오라/.test(key))return `<span class="decor-preview decor-aura-spark" aria-hidden="true"><i class="ring"></i><i class="ring ring2"></i><u class="spark s1"></u><u class="spark s2"></u><u class="spark s3"></u><b class="pet"></b></span>`;
 if(it.slot==='footprint'||/footprint|발자국/.test(key))return `<span class="decor-preview decor-footprint-leaf" aria-hidden="true"><i class="leaf l1"></i><i class="leaf l2"></i><i class="leaf l3"></i><i class="leaf l4"></i></span>`;
 if(it.slot==='victory'||/victory_pose|승리 포즈/.test(key))return `<span class="decor-preview decor-victory-pose" aria-hidden="true"><b class="pet"></b><u class="star st1"></u><u class="star st2"></u></span>`;
 if(it.slot==='nameplate'||/nameplate|이름표/.test(key))return `<span class="decor-preview decor-nameplate" aria-hidden="true"><i>꼬물이</i></span>`;
 if(it.slot==='floor'||/바닥|floor/.test(key))return /wood|원목/.test(key)?`<span class="decor-preview decor-floor-wood" aria-hidden="true"><i></i><u></u></span>`:`<span class="decor-preview decor-floor-cloud" aria-hidden="true"><i></i><u></u><b></b></span>`;
 if(it.slot==='window'||/창문|window/.test(key))return `<span class="decor-preview decor-window-moon" aria-hidden="true"><i></i><u></u><b></b></span>`;
 if(it.slot==='rug'||/러그|rug/.test(key))return `<span class="decor-preview decor-rug-star" aria-hidden="true"><i></i></span>`;
 if(it.slot==='bubble'||/말풍선|bubble/.test(key))return `<span class="decor-preview decor-bubble-pixel" aria-hidden="true"><i>안녕!</i></span>`;
 if(it.slot==='entrance'||/출전|entrance/.test(key))return `<span class="decor-preview decor-entrance-star" aria-hidden="true"><b class="pet"></b><u class="trail t1"></u><u class="trail t2"></u><u class="trail t3"></u></span>`;
 if(it.slot==='huntTrail'||/사냥|흔적|trail/.test(key))return `<span class="decor-preview decor-hunt-trail" aria-hidden="true"><i class="dust d1"></i><i class="dust d2"></i><i class="dust d3"></i><b class="track"></b></span>`;
 if(it.slot==='victoryFx'||/승리 연출|confetti/.test(key))return `<span class="decor-preview decor-victory-fx" aria-hidden="true"><i class="conf c1"></i><i class="conf c2"></i><i class="conf c3"></i><i class="conf c4"></i><b class="pet"></b></span>`;
 return `<span class="decor-preview decor-generic" aria-hidden="true"><i>✨</i></span>`;
};
const shopBoostPreview=it=>{
 const key=(it.id||'')+' '+(it.name||'')+' '+(it.desc||'');
 if(/domain|study|학습|숙련/.test(key))return `<span class="boost-preview boost-study" aria-hidden="true"><i class="sheet"></i><u class="star s1"></u><u class="star s2"></u><b>+XP</b></span>`;
 if(/offline|자동훈련|오프라인/.test(key))return `<span class="boost-preview boost-offline" aria-hidden="true"><i class="clock"></i><u class="spark s1"></u><u class="spark s2"></u><b>AUTO</b></span>`;
 return `<span class="boost-preview boost-generic" aria-hidden="true"><i>⚡</i></span>`;
};
const flipHuntPetDir=dir=>dir==='left'?'right':dir==='right'?'left':dir;

function renderPetProxies(state){
 const p=mainPet(state);if(!p)return;const stage=p.temporaryRegression?2:Number(p.stage||0);
 const ids=['homePetProxy','studyPetProxy','shopPetProxy','explorePetProxy','petsPetProxy','recordPetProxy','eventsPetProxy','morePetProxy'];
 for(const id of ids){const el=document.getElementById(id);if(!el)continue;el.classList.remove('newborn','sprite','newborn-sprite');el.innerHTML='';el.style.backgroundImage='';el.style.backgroundPosition='';
  if(stage===0){el.classList.add('sprite','newborn-sprite');el.style.backgroundImage=`url("assets/pets/common_stage0_6x12.png?rev=${encodeURIComponent(BUILD_REV)}")`;el.style.setProperty('--pet-bg-w','600%');el.style.setProperty('--pet-bg-h','1200%');el.style.backgroundPosition='0 0';}
  else{const safe=Math.max(1,Math.min(4,stage)),resolved=resolvePetAsset(p.starter,safe),src=resolved.path;if(src){el.classList.add('sprite');el.style.backgroundImage=`url("${src}?rev=${encodeURIComponent(BUILD_REV)}")`;const modern=resolved.format==='modern24';el.style.setProperty('--pet-bg-w',modern?'600%':'400%');el.style.setProperty('--pet-bg-h',modern?'2400%':'2200%');}}
 }
 const rc=document.getElementById('roomCanvas');if(rc&&stage===0)rc.classList.add('stage0-interactive');else rc?.classList.remove('stage0-interactive');
}
function createUI(state,actions){
 let study={domain:'덧셈',difficulty:'보통',quiz:null},battleQuiz=null,shopCategory='전체',lastEvolutionShown='';
 function toast(msg){if(!msg)return;const t=$('#toast');t.textContent=msg;t.classList.add('show');clearTimeout(t._x);t._x=setTimeout(()=>t.classList.remove('show'),2200);}
 function say(msg,direct=false){if(!msg)return;if(!direct){const p=mainPet(state);if(p._voice?.text!==msg)toast(msg);msg=window.PetLife.voiceForMessage(p,msg);}const homeActive=state.ui.tab==='home'&&state.onboarding.done;const s=homeActive?$('#petSpeech'):$('#speech');if(!s)return;s.textContent=msg;s.classList.remove('hidden');clearTimeout(s._x);s._x=setTimeout(()=>s.classList.add('hidden'),homeActive?2400:3000);}
 function pulseFx(msg=''){const fx=$('#fxLayer');if(!fx||!state.settings.motion)return;const cls=/희귀|각성/.test(msg)?'fx-rare':/레벨|진화/.test(msg)?'fx-level':/부족|오답|패배|실패|없어/.test(msg)?'fx-error':'fx-success';fx.className='fx-layer';void fx.offsetWidth;fx.classList.add(cls);}
 function petReaction(kind='heart'){const fx=$('#petReactionFx');if(!fx)return;const icons={heart:'♡',hold:'✦',play:'♪',talk:'…',food:'✧',hit:'💢',scold:'!'};fx.textContent=icons[kind]||'✦';fx.className='pet-reaction-fx';const stage=fx.parentElement||$('.pet-stage'),rc=$('#roomCanvas'),hit=rc?._petHit;if(stage&&rc&&hit){const sr=stage.getBoundingClientRect(),rr=rc.getBoundingClientRect(),px=(rr.left-sr.left)+hit.x*rr.width,py=(rr.top-sr.top)+(hit.y-(hit.ry||.13)-.06)*rr.height;fx.style.left=`${Math.max(24,Math.min(sr.width-24,px))}px`;fx.style.top=`${Math.max(24,Math.min(sr.height-24,py))}px`;fx.style.right='auto';fx.style.bottom='auto';fx.style.transform='translate(-50%,-100%)';}else{fx.style.left='';fx.style.top='';fx.style.right='';fx.style.bottom='';fx.style.transform='';}void fx.offsetWidth;fx.classList.add('show','kind-'+kind);}
 function showLoot(loot){if(!loot)return;let el=$('#lootBurst');if(!el){el=document.createElement('div');el.id='lootBurst';document.body.append(el);}el.className='loot-burst rarity-'+(loot.rarity||'common');el.innerHTML=iconMarkup(loot.kind||loot.id,'✦')+'<small>'+(loot.rarityName||'일반')+' 획득</small><b>'+loot.label+'</b>';void el.offsetWidth;el.classList.add('show');clearTimeout(el._x);el._x=setTimeout(()=>el.classList.remove('show'),loot.rarity==='legendary'?3200:loot.rarity==='epic'?2600:loot.rarity==='rare'?2200:1500);}
 function showFood(it){if(!it)return;const rc=$('#roomCanvas');if(rc)rc._petFoodUntil=Date.now()+1800;let el=$('#foodBurst');if(!el){el=document.createElement('div');el.id='foodBurst';document.body.append(el);}const icon={crunch:'🍎',soft:'🍌',sip:'🥛',bite:'🍖',jelly:'🧃',special:'✨'}[it.foodStyle]||'🍽️';el.className='food-burst food-'+(it.foodStyle||'bite');el.innerHTML=`<div class="food-icon">${iconMarkup(it.id,icon)}</div><b>${it.name}</b><small>냠냠!</small>`;void el.offsetWidth;el.classList.add('show');clearTimeout(el._x);el._x=setTimeout(()=>el.classList.remove('show'),1500);$('#roomCanvas')?.classList.add('pet-eating');setTimeout(()=>$('#roomCanvas')?.classList.remove('pet-eating'),900);actions.sfx?.(it.foodStyle==='sip'?'feed_soft':it.foodStyle==='special'?'feed_special':'feed_crunch');actions.haptic?.('tap');}
 function startHomePlay(){
  if(state.hunt?.running||state.battle?.running||state.exploration?.active){toast('다른 활동 중에는 놀아줄 수 없어.');actions.sfx?.('error');return;}
  const p=mainPet(state),rc=$('#roomCanvas');if(!p||!rc){toast('생활 화면을 다시 열어 줘.');return;}
  const msg=interact(state,'play');recordNewbornCare('play');petReaction('play');
  const now=Date.now();rc._petHappyUntil=now+4600;rc._petPlayUntil=now+4600;rc._petPlayStart=now;rc._petPlayEnd=now+4600;delete rc._petPlayScene;
  rc.classList.remove('pet-playing');void rc.offsetWidth;rc.classList.add('pet-playing');setTimeout(()=>rc.classList.remove('pet-playing'),4700);
  window.PetLife.action?.(p,'play',4200);actions.sfx?.('play');actions.haptic?.('tap');say(msg);commit();
 }
 function showEvolution(p,ev){if(!ev||ev.id===lastEvolutionShown||state.ui.lastEvolutionFx===ev.id)return;lastEvolutionShown=ev.id;state.ui.lastEvolutionFx=ev.id;actions.save();let el=$('#evolutionBurst');if(!el){el=document.createElement('div');el.id='evolutionBurst';document.body.append(el);}const form=ev.stage===3?(ev.form==='rare-balance'?'희귀 균형형':ev.form==='power'?'파워형':ev.form==='speed'?'스피드형':ev.form==='mind'?'지능형':'균형형'):'성장형',fromStage=Number.isFinite(Number(ev.fromStage))?Number(ev.fromStage):Math.max(0,Number(ev.stage||1)-1);const sprite=(stage,cls)=>{if(stage===0)return `<div class="evo-pet ${cls} newborn-sprite" style="background-image:url('assets/pets/common_stage0_6x12.png?rev=${encodeURIComponent(BUILD_REV)}');--evo-bg-w:600%;--evo-bg-h:1200%;background-position:0 0"></div>`;const r=resolvePetAsset(p.starter,stage),modern=r.format==='modern24',bgw=modern?'600%':'400%',bgh=modern?'2400%':'2200%';return `<div class="evo-pet ${cls}" style="width:${Math.round(window.PetLife.size(stage,100))}px;height:${Math.round(window.PetLife.size(stage,100))}px;background-image:url('${r.path}?rev=${encodeURIComponent(BUILD_REV)}');--evo-bg-w:${bgw};--evo-bg-h:${bgh}"></div>`;};el.className='evolution-burst stage-'+ev.stage;el.innerHTML=`<div class="evo-flare"></div><div class="evo-stage">${sprite(fromStage,'before')}<div class="evo-arrow">✦</div>${sprite(ev.stage,'after')}</div><small>${ev.reason}</small><strong>${p.name}</strong><b>${ev.stage}단계 · ${form}</b><em>EVOLUTION</em>`;void el.offsetWidth;el.classList.add('show');actions.sfx?.('evolution');actions.haptic?.('reward');clearTimeout(el._x);say(window.PetLife.line(p,'evolution_before',fromStage),true);el._x=setTimeout(()=>{el.classList.remove('show');window.PetLife.cue(p,'victory',1800);say(window.PetLife.line(p,'evolution_after'),true);},3600);}
 function commit(msg){actions.save();renderAll();if(msg){toast(msg);pulseFx(msg);actions.cue?.(msg);}}
 function clearTransientUi(nextName){
  $$('.shortcut-sheet,.progress-sheet,.hunt-options,.battle-log-sheet,.event-league').forEach(d=>{d.removeAttribute('open');d.classList.remove('jelly-opening','jelly-closing');});
  try{closeFoodDrawer();closeInventoryDrawer();}catch{}
  const modal=$('#settingsModal');if(modal){modal.classList.remove('open');modal.classList.add('hidden');}
  $('#speech')?.classList.add('hidden');$('#petSpeech')?.classList.add('hidden');
  document.body.classList.toggle('hunt-minimal',nextName==='hunt'&&!!state.hunt?.settings?.minimalUI);
 }
 function tab(name){
  const target=$(`#tab-${name}`);if(!target)return;
  if(name!==state.ui.tab){
    if(state.hunt?.running&&name!=='hunt'){
      if(!confirm('자동사냥을 끝내고 다른 활동으로 이동할까?'))return;
      toast(stopHunt(state,'다른 활동을 하려고 자동사냥에서 귀환했다.'));
    }
    if(state.battle?.running&&name!=='battle'){
      if(!confirm('진행 중인 배틀을 중단하고 이동할까?'))return;
      toast(cancelBattle(state,'배틀을 중단하고 다른 활동으로 이동했다.'));
    }
    if(state.exploration?.active?.kind==='walk'&&name!=='explore'){
      const walkMsg=cancelExploration(state,'산책 화면을 나와 집으로 돌아왔어.');
      toast(walkMsg);
    }
  }
  clearTransientUi(name);
  state.ui.tab=name;actions.syncMusic?.();const secondary=['shop','explore','pets','record','events'];$$('[data-tab]').forEach(b=>b.classList.toggle('active',b.dataset.tab===name||(b.dataset.tab==='more'&&secondary.includes(name))));$$('.tabpage').forEach(p=>p.classList.toggle('active',p.id===`tab-${name}`));const page=$(`#tab-${name}`);if(page&&state.settings.motion){page.classList.remove('page-enter');requestAnimationFrame(()=>page.classList.add('page-enter'));}renderAll();actions.save();
 }
 function ensureNewbornCare(){
  const ob=state.onboarding;ob.careTotal=Number(ob.careTotal||0);ob.careGoal=24;
  const old=ob.careScores||{};
  // 첫 진화는 네 계통만 사용한다. 이전 버전의 활동형/자유형 점수는 가장 가까운 계통으로 1회 이관한다.
  if(!ob.fourBranchV2){
   old.brave=Number(old.brave||0)+Number(old.active||0);
   old.wise=Number(old.wise||0)+Number(old.free||0);
   delete old.active;delete old.free;ob.fourBranchV2=true;
  }
  ob.careScores={brave:Number(old.brave||0),wise:Number(old.wise||0),kind:Number(old.kind||0),careful:Number(old.careful||0)};
  ob.careCounts=ob.careCounts||{};ob.careRecent=Array.isArray(ob.careRecent)?ob.careRecent:[];return ob;
 }
 const newbornCareDefs={
  // 용기형: 몸을 쓰며 도전 / 지혜형: 생각하고 대화 / 다정형: 교감과 칭찬 / 신중형: 먹기·훈련·공부의 꾸준함
  pet:{kind:2.5,careful:.2},
  feed:{careful:1.8,kind:.9},
  play:{brave:2.2,kind:.3},
  talk:{wise:2.1,kind:.5},
  praise:{kind:1.5,brave:.9},
  train:{brave:2.3,careful:.7},
  study:{wise:2.3,careful:.8}
 };
 const newbornActionBranch={pet:'kind',feed:'careful',play:'brave',talk:'wise',praise:'kind',train:'brave',study:'wise'};
 function resolveNewbornStarter(ob){
  const ids=['brave','wise','kind','careful'],scores=ids.map(id=>[id,Number(ob.careScores[id]||0)]);scores.sort((a,b)=>b[1]-a[1]);
  const top=scores[0][1],tied=scores.filter(([,v])=>Math.abs(v-top)<1e-9).map(([id])=>id);if(tied.length===1)return tied[0];
  // 동점일 때만 최근 돌봄 행동을 거꾸로 보며 사용자가 마지막으로 기울인 계통을 따른다. 랜덤 추첨은 하지 않는다.
  for(let i=ob.careRecent.length-1;i>=0;i--){const id=newbornActionBranch[ob.careRecent[i]];if(tied.includes(id))return id;}
  return tied[0]||'kind';
 }
 function recordNewbornCare(kind){const p=mainPet(state);if(!p||p.stage!==0)return false;const def=newbornCareDefs[kind];if(!def)return false;const ob=ensureNewbornCare(),n=Number(ob.careCounts[kind]||0),factor=n<2?1:n<4?.65:.35;for(const [k,v] of Object.entries(def))ob.careScores[k]=Number(ob.careScores[k]||0)+v*factor;ob.careCounts[k]=n+1;ob.careTotal++;ob.careRecent.push(kind);ob.careRecent=ob.careRecent.slice(-12);const variety=Object.values(ob.careCounts).filter(v=>Number(v)>0).length;if(ob.careTotal>=ob.careGoal&&variety>=4){const winner=resolveNewbornStarter(ob);ob.resolvedStarter=winner;actions.evolveNewborn(winner);actions.sfx?.('evolution');actions.haptic?.('reward');return true;}return false;}
 function renderOnboarding(){
  const root=$('#onboarding');
  if(state.onboarding.done){root.classList.add('hidden');$('#game').classList.remove('hidden');return;}
  $('#game').classList.add('hidden');root.classList.remove('hidden');
  const ob=state.onboarding;ob.phase=ob.phase||'egg';ob.eggTaps=Number(ob.eggTaps||0);ensureNewbornCare();
  if(ob.phase==='egg'){
   const taps=ob.eggTaps,crack=taps>=2?`crack-${Math.min(5,taps)}`:'';
   root.innerHTML=`<div class="birth-scene egg-phase"><div class="nursery-bg"><i></i><i></i><i></i></div><div class="birth-copy"><small>새 친구가 잠들어 있어</small><h1>톡톡, 깨워볼까?</h1></div><button id="birthEgg" class="birth-egg-shell ${crack}" aria-label="알 깨기"><span class="egg-crack"></span></button><p class="egg-hint">알을 가볍게 눌러줘</p><div class="egg-progress">${Array.from({length:6},(_,i)=>`<i class="${i<taps?'on':''}"></i>`).join('')}</div></div>`;
   $('#birthEgg').onclick=()=>{const egg=$('#birthEgg');if(!egg||ob.phase!=='egg')return;ob.eggTaps=Math.min(6,ob.eggTaps+1);actions.sfx?.('squish');actions.haptic?.('tap');egg.classList.remove('tap-pop','crack-2','crack-3','crack-4','crack-5');void egg.offsetWidth;egg.classList.add('tap-pop');if(ob.eggTaps>=2&&ob.eggTaps<6)egg.classList.add(`crack-${Math.min(5,ob.eggTaps)}`);document.querySelectorAll('.egg-progress i').forEach((dot,i)=>dot.classList.toggle('on',i<ob.eggTaps));if(ob.eggTaps>=6){ob.phase='hatch';actions.save();egg.classList.add('hatching');egg.disabled=true;setTimeout(renderOnboarding,720);}else actions.save();};return;
  }
  if(ob.phase==='hatch'){
   root.innerHTML=`<div class="birth-scene hatch-phase"><div class="hatch-flash"></div><div class="shell-half left"></div><div class="shell-half right"></div><div class="newborn-blob"><span class="blob-eye a"></span><span class="blob-eye b"></span><span class="blob-mouth"></span></div><h1>꼬물… 꼬물!</h1><p>이제 방에서 함께 지내보자.</p></div>`;actions.sfx?.('reward');setTimeout(()=>{if(ob.phase!=='hatch')return;actions.beginNewborn();renderOnboarding();tab('home');renderAll();},1500);return;
  }
  // 구형 저장 데이터의 nursery/ready/evolve/name 화면은 더 이상 사용하지 않는다.
  actions.beginNewborn();renderOnboarding();tab('home');renderAll();
 }
 function renderAll(){if(!state.onboarding.done){document.body.classList.remove('game-ready');return;}document.body.classList.add('game-ready');const p=mainPet(state);if(!p)return;renderPetProxies(state);$('#starText').textContent=Math.floor(state.stars);$('#headerPet').textContent=`${p.representativeTitle?`${p.representativeTitle} `:''}${p.name}`;{const secondary=['shop','explore','pets','record','events'];$$('[data-tab]').forEach(b=>b.classList.toggle('active',b.dataset.tab===state.ui.tab||(b.dataset.tab==='more'&&secondary.includes(state.ui.tab))));}$$('.tabpage').forEach(pg=>pg.classList.toggle('active',pg.id===`tab-${state.ui.tab}`));const renderers={home:renderHome,study:renderStudy,shop:renderShop,hunt:renderHunt,explore:renderExplore,battle:renderBattle,pets:renderPets,record:renderRecord,events:renderEvents};renderers[state.ui.tab]?.();renderSettings();window.PetLife.render(state,actions,renderAll);requestAnimationFrame(()=>drawAllScenesOnce(state,performance.now()));}
 let suppressFoodClickUntil=0;
 function roomPetClientPoint(){const rc=$('#roomCanvas'),h=rc?._petHit;if(!rc||!h)return null;const r=rc.getBoundingClientRect();return {x:r.left+h.x*r.width,y:r.top+h.y*r.height,rect:r};}
 function launchFoodThrow(button,it,startPoint=null){
  const rc=$('#roomCanvas'),target=roomPetClientPoint();if(!rc||!target||!it)return false;
  const src=button.getBoundingClientRect(),ghost=document.createElement('div');ghost.className='food-drag-ghost throwing';
  const img=button.querySelector('.asset-thumb img');ghost.innerHTML=img?`<img src="${img.src}" alt="">`:'🍪';
  const sx=startPoint?.x??(src.left+src.width/2),sy=startPoint?.y??(src.top+Math.min(34,src.height/2)),tx=target.x,ty=target.y;
  ghost.style.left=`${sx}px`;ghost.style.top=`${sy}px`;document.body.append(ghost);closeFoodDrawer();
  const dx=tx-sx,dy=ty-sy,arc=Math.max(54,Math.min(150,Math.abs(dx)*.24+62));
  rc._petLookAtFoodUntil=Date.now()+650;
  const anim=ghost.animate([{transform:'translate(-50%,-50%) scale(1) rotate(0deg)'},{transform:`translate(calc(-50% + ${dx*.48}px),calc(-50% + ${dy*.48-arc}px)) scale(1.12) rotate(150deg)`,offset:.48},{transform:`translate(calc(-50% + ${dx}px),calc(-50% + ${dy}px)) scale(.72) rotate(330deg)`}],{duration:520,easing:'cubic-bezier(.18,.7,.2,1)',fill:'forwards'});
  actions.sfx?.('squish');
  anim.onfinish=()=>{ghost.remove();const msg=useFood(state,it.id);if(!/없어|먹을 수 없는/.test(msg)){showFood(it);recordNewbornCare('feed');rc._petHappyUntil=Date.now()+720;rc._petFoodUntil=Date.now()+1800;petReaction('food');}say(msg);commit();};
  return true;
 }
 function bindFoodThrow(){
  $$('.food-choice[data-feed-id]').forEach(button=>{
   if(button.dataset.throwBound)return;button.dataset.throwBound='1';let drag=null;
   const makeGhost=e=>{if(drag?.ghost)return;drag.moved=true;drag.ghost=document.createElement('div');drag.ghost.className='food-drag-ghost active';const img=button.querySelector('.asset-thumb img');drag.ghost.innerHTML=img?`<img src="${img.src}" alt="">`:'🍪';document.body.append(drag.ghost);drag.ghost.style.left=`${e.clientX}px`;drag.ghost.style.top=`${e.clientY}px`;button.classList.add('is-food-dragging');};
   button.addEventListener('pointerdown',e=>{if(button.disabled)return;drag={id:e.pointerId,x:e.clientX,y:e.clientY,moved:false,ghost:null};button.setPointerCapture?.(e.pointerId);e.preventDefault();});
   button.addEventListener('pointermove',e=>{if(!drag||drag.id!==e.pointerId)return;const dist=Math.hypot(e.clientX-drag.x,e.clientY-drag.y);if(dist<5&&!drag.moved)return;makeGhost(e);drag.ghost.style.left=`${e.clientX}px`;drag.ghost.style.top=`${e.clientY}px`;e.preventDefault();});
   const end=e=>{if(!drag||drag.id!==e.pointerId)return;const d=drag;drag=null;button.classList.remove('is-food-dragging');if(d.ghost)d.ghost.remove();if(!d.moved)return;suppressFoodClickUntil=Date.now()+700;const stage=$('.pet-stage'),r=stage?.getBoundingClientRect(),inside=!!r&&e.clientX>=r.left&&e.clientX<=r.right&&e.clientY>=r.top&&e.clientY<=r.bottom;if(inside){const it=shops.find(x=>x.id===button.dataset.feedId);launchFoodThrow(button,it,{x:e.clientX,y:e.clientY});}else toast('방 안으로 가져와서 놓으면 꼬물이에게 던져 줄 수 있어.');};
   button.addEventListener('pointerup',end);button.addEventListener('pointercancel',e=>{if(!drag)return;if(drag.ghost)drag.ghost.remove();button.classList.remove('is-food-dragging');drag=null;});
  });
 }
 function renderHomeInventory(){
  const eq=state.equipment||{charm:null,accessory:null,relic:null},slotName={charm:'부적',accessory:'장신구',relic:'유물'};
  const equipables=inventorySellables(state).filter(it=>passiveEffectCatalog[it.id]?.mode==='equipped');
  const eqHtml=['charm','accessory','relic'].map(slot=>{const id=eq[slot],info=id?equipables.find(x=>x.id===id):null;return `<div class="equip-slot ${id?'filled':''}"><span>${slotName[slot]}</span>${id?`${iconMarkup(id,'✦')}<b>${info?.name||id}</b><button data-unequip-slot="${slot}">해제</button>`:'<small>비어 있음</small>'}</div>`}).join('');
  const spare=equipables.filter(it=>!Object.values(eq).includes(it.id)).map(it=>`<button class="inventory-item" data-equip-id="${it.id}">${iconMarkup(it.id,'✦')}<span><b>${it.name}</b><small>${effectLabel(it.id)||'장착 아이템'}</small></span><em>×${it.qty}</em></button>`).join('');
  const eqRoot=$('#inventoryEquipment');if(eqRoot)eqRoot.innerHTML=eqHtml+(spare||'<span class="inventory-empty">추가 장비 없음</span>');
  const furnRoot=$('#inventoryFurniture');if(furnRoot)furnRoot.innerHTML=(state.furnitureOwned||[]).map(id=>{const it=shops.find(x=>x.id===id),placed=state.furniturePlaced.some(f=>f.id===id&&f.room===state.currentRoom);return `<button class="inventory-item furniture-drag-item ${placed?'placed':''}" data-inv-furn="${id}">${iconMarkup(id,'🪑','furniture')}<span><b>${it?.name||id}</b><small>${placed?'이 방에 배치 중':'누르거나 끌어서 배치'}</small></span></button>`}).join('')||'<span class="inventory-empty">보유 가구 없음 · 상점에서 구매할 수 있어</span>';
  const itemRoot=$('#inventoryItems');if(itemRoot){const equipIds=new Set(equipables.map(x=>x.id));const items=inventorySellables(state).filter(it=>!equipIds.has(it.id));itemRoot.innerHTML=items.map(it=>{const shop=shops.find(x=>x.id===it.id),food=shop?.kind==='food';return `<button class="inventory-item ${food?'food-item':''}" ${food?`data-inv-food="${it.id}"`:''}>${iconMarkup(it.id,food?'🍎':'✦')}<span><b>${it.name}</b><small>${food?'먹이 · 눌러서 선택':(effectLabel(it.id)||it.desc||'보관 중')}</small></span><em>×${it.qty}</em></button>`}).join('')||'<span class="inventory-empty">보관 중인 아이템이 없어</span>';}
  $$('[data-equip-id]').forEach(b=>b.onclick=()=>{const r=equipItem(state,b.dataset.equipId);commit(r.msg);renderHomeInventory();});
  $$('[data-unequip-slot]').forEach(b=>b.onclick=()=>{const r=unequipItem(state,b.dataset.unequipSlot);commit(r.msg);renderHomeInventory();});
  $$('[data-inv-food]').forEach(b=>b.onclick=()=>{closeInventoryDrawer();openFoodDrawer();});
  $$('[data-inv-furn]').forEach(button=>{let drag=null;button.onpointerdown=e=>{if(button.classList.contains('placed')){toast('이미 이 방에 배치된 가구야. 방에서 직접 끌어 옮길 수 있어.');return;}drag={id:e.pointerId,sx:e.clientX,sy:e.clientY,moved:false,ghost:null};button.setPointerCapture?.(e.pointerId);e.preventDefault();};button.onpointermove=e=>{if(!drag||drag.id!==e.pointerId)return;const dist=Math.hypot(e.clientX-drag.sx,e.clientY-drag.sy);if(dist>7)drag.moved=true;if(drag.moved&&!drag.ghost){drag.ghost=document.createElement('div');drag.ghost.className='furniture-drag-ghost';drag.ghost.innerHTML=button.querySelector('.asset-thumb')?.outerHTML||'🪑';document.body.appendChild(drag.ghost);}if(drag.ghost){drag.ghost.style.left=`${e.clientX}px`;drag.ghost.style.top=`${e.clientY}px`;}};const end=e=>{if(!drag||drag.id!==e.pointerId)return;const d=drag;drag=null;d.ghost?.remove();const stage=$('.pet-stage'),r=stage?.getBoundingClientRect();if(d.moved&&r&&e.clientX>=r.left&&e.clientX<=r.right&&e.clientY>=r.top&&e.clientY<=r.bottom){if(placeFurniture(state,button.dataset.invFurn)){const nx=(e.clientX-r.left)/r.width,ny=(e.clientY-r.top)/r.height;setFurniturePosition(state,button.dataset.invFurn,nx,ny);commit('가구를 방에 놓았어.');closeInventoryDrawer();}else toast('이 방에는 더 배치할 수 없거나 이미 놓여 있어.');}else if(!d.moved){if(placeFurniture(state,button.dataset.invFurn)){commit('가구를 방에 배치했어.');renderHomeInventory();}else toast('이 방에는 더 배치할 수 없거나 이미 놓여 있어.');}};button.onpointerup=end;button.onpointercancel=e=>{if(drag?.ghost)drag.ghost.remove();drag=null;};});
 }
 function renderHome(){const p=mainPet(state),stage=p.temporaryRegression?2:p.stage,newborn=stage===0;if(p.lastEvolutionEvent&&p.lastEvolutionEvent.id!==lastEvolutionShown&&state.ui.lastEvolutionFx!==p.lastEvolutionEvent.id)setTimeout(()=>showEvolution(p,p.lastEvolutionEvent),40);$('#petName').textContent=p.name;$('#petSpecies').textContent=newborn?'아직 어떤 아이로 자랄지는 몰라':p.species;$('#petStage').textContent=newborn?'0단계 · 꼬물이':`${stage}단계${p.evolutionForm&&p.stage===3?` · ${p.evolutionForm}`:''}${p.temporaryRegression?' (일시 회복중)':''}`;$('#personality').textContent=newborn?'함께 지내며 성향을 알아가는 중':`${p.primary} + ${p.secondary}`;$('#level').textContent=newborn?'0단계':`Lv.${p.level}`;if($('#petTitleLine'))$('#petTitleLine').textContent=p.representativeTitle||`${p.primary} 성향`;if($('#growthNextText')){if(newborn){const ob=ensureNewbornCare(),variety=Object.values(ob.careCounts||{}).filter(v=>Number(v)>0).length;$('#growthNextText').textContent=`첫 진화 준비 ${Math.min(ob.careTotal,ob.careGoal)}/${ob.careGoal} · 돌봄 종류 ${Math.min(variety,4)}/4`;}else if(p.stage===1){const okLv=p.level>=12,okQ=p.totalQuestions>=35,okBond=p.bond>=60,okEvo=p.evolution>=10;$('#growthNextText').textContent=`2단계 조건 · Lv.12 ${okLv?'✓':''} · 학습 35 ${okQ?'✓':''} · 교감 60 ${okBond?'✓':''} · 진화력 10 ${okEvo?'✓':''}`;}else $('#growthNextText').textContent=`다음 Lv.${p.level+1}`;}$('#expBar').style.width=`${clamp(p.exp/(34*Math.pow(p.level,1.16))*100,0,100)}%`;$('#homeStats').innerHTML=[['포만도',p.hunger,'🍴'],['기분',p.mood,'♥']].map(([n,v,icon])=>`<div class="meter home-meter"><span><em>${icon}</em>${n}</span><div><i style="width:${v}%"></i></div><b>${Math.round(v)} / 100</b></div>`).join('');let extra=p.adolescence?'<b>성장 이벤트</b> 사춘기 변화가 진행 중이야.':'';if(p.runaway)extra+=`<br><b>가출 흔적</b> ${p.runaway.clue} <button id="findPetBtn">찾으러 가기</button>`;if(p.parting)extra+=`<br><b>관계 회복 이벤트</b> 펫이 앞으로의 관계를 고민 중이야.<div class="actions"><button data-parting="talk">대화하기</button><button data-parting="favorite">좋아하는 물건</button><button data-parting="study">함께 문제 풀고 약속</button></div>`;$('#homeNote').innerHTML=extra;$('#homeNote').classList.toggle('hidden',!extra);if($('#findPetBtn'))$('#findPetBtn').onclick=()=>commit(resolveRunaway(state));$$('[data-parting]').forEach(b=>b.onclick=()=>{const msg=resolveParting(state,b.dataset.parting);say(msg);commit();});$('#inventoryQuick').innerHTML=Object.entries(state.inventory).filter(([id,n])=>n>0&&shops.some(x=>x.id===id&&x.kind==='food')).map(([id,n])=>{const it=shops.find(x=>x.id===id);const rarity=it?shopRarity(it):'common';return `<button class="inventory-chip rarity-${rarity}" data-use="${id}">${iconMarkup(id,'🍎')}<span>${it?.name||id} ×${n}</span><small>${rarityMeta[rarity]?.name||'일반'} · ${it?.desc||''}</small></button>`}).join('')||'<span class="muted">먹을 수 있는 생활 아이템이 없어.</span>';$$('[data-use]').forEach(b=>b.onclick=()=>{const it=shops.find(x=>x.id===b.dataset.use);const msg=useFood(state,b.dataset.use);if(!/없어|먹을 수 없는/.test(msg)){showFood(it);recordNewbornCare('feed');}say(msg);commit();});const foodList=shops.filter(it=>it.kind==='food'&&(state.inventory[it.id]||0)>0);$('#foodChoices').innerHTML=foodList.length?foodList.map(it=>{const n=state.inventory[it.id]||0;return `<button class="food-choice ${n?'has-stock':'out-stock'}" data-feed-id="${it.id}" ${n?'':'disabled'}>${iconMarkup(it.id,'🍽️')}<span><b>${it.name}</b><small>${it.hunger?`포만 +${it.hunger}`:''}${it.mood?` · 기분 +${it.mood}`:''}${it.condition?` · 컨디션 +${it.condition}`:''}</small></span><em>×${n}</em></button>`}).join(''):'<div class="food-empty"><b>먹이가 없어</b><small>상점에서 준비할 수 있어.</small></div>';$$('[data-feed-id]').forEach(b=>b.onclick=()=>{if(Date.now()<suppressFoodClickUntil)return;closeFoodDrawer();const it=shops.find(x=>x.id===b.dataset.feedId),msg=useFood(state,b.dataset.feedId);if(!/없어|먹을 수 없는/.test(msg)){showFood(it);recordNewbornCare('feed');}say(msg);commit();});bindFoodThrow();$('#offlineFacility').innerHTML=offlineFacilities.map(f=>`<option value="${f.id}" ${state.offlineFacility===f.id?'selected':''}>${f.name} · ${f.desc}</option>`).join('');$('#offlineFacility').onchange=e=>{state.offlineFacility=e.target.value;commit('오프라인 자동성장 시설을 바꿨어.');};$('#roomList').innerHTML=roomDefinitions.map(r=>{const owned=state.rooms.includes(r.id);return `<button data-room="${r.id}" class="${state.currentRoom===r.id?'active':''}">${r.name}${owned?'':` · ${r.price}별`}</button>`}).join('');$$('[data-room]').forEach(b=>b.onclick=()=>{const id=b.dataset.room;if(state.rooms.includes(id)){switchRoom(state,id);actions.sfx?.('room_move');commit();}else{const r=unlockRoom(state,id);commit(r.msg);}});$('#furnitureList').innerHTML=state.furnitureOwned.map(id=>{const it=shops.find(x=>x.id===id);const name=it?.name||'기본 침대',placed=state.furniturePlaced.some(f=>f.id===id&&f.room===state.currentRoom);const rarity=it?shopRarity(it):'common',rm=rarityMeta[rarity],effect=effectLabel(id);return `<span class="furn-row rarity-row rarity-${rarity}"><button class="furn-place-btn" data-place="${id}" ${placed?'disabled':''}>${iconMarkup(id,'🪑','furniture')}<span class="furn-label"><b>${name}${placed?' ✓':''}</b><small>${rm?.name||'일반'}${effect?` · ${effect}`:''}</small></span></button>${placed&&it?`<button data-furnuse="${id}">사용</button>`:''}</span>`}).join('');$$('[data-place]').forEach(b=>b.onclick=()=>{if(placeFurniture(state,b.dataset.place))commit('가구를 방에 배치했어.');else commit(`이 방에는 가구를 최대 ${Math.min(7,state.home.furnitureCapacity)}개까지 배치할 수 있어.`);});$$('[data-furnuse]').forEach(b=>b.onclick=()=>{const msg=useFurniture(state,b.dataset.furnuse);say(msg);commit();});renderHomeInventory();}
 function renderStudy(){const p=mainPet(state),settingLabel=`${study.domain} · ${study.difficulty}`;if($('#studyStreakChip'))$('#studyStreakChip').textContent=p.studyStreak?`${p.studyStreak}연속 정답`:'오늘의 학습';if($('#studySettingSummary'))$('#studySettingSummary').textContent=settingLabel;if($('#studyCurrent'))$('#studyCurrent').textContent=settingLabel;$('#domainButtons').innerHTML=domains.map(d=>`<button data-domain="${d}" class="${study.domain===d?'active':''}">${d}</button>`).join('');$$('[data-domain]').forEach(b=>b.onclick=()=>{study.domain=b.dataset.domain;study.quiz=null;const settings=$('#studySettings');if(settings)settings.open=false;renderStudy();});$('#difficultyButtons').innerHTML=Object.keys(difficulties).map(d=>`<button data-difficulty="${d}" class="${study.difficulty===d?'active':''}">${d}</button>`).join('');$$('[data-difficulty]').forEach(b=>b.onclick=()=>{study.difficulty=b.dataset.difficulty;study.quiz=null;const settings=$('#studySettings');if(settings)settings.open=false;renderStudy();});const m=p.mastery[study.domain];if(!study.quiz)study.quiz=makeQuiz(study.domain,study.difficulty,m.recentTypes);$('#studyQuestion').innerHTML=`${study.quiz.q}<small class="question-type">${study.quiz.label}</small>`;$('#studyAnswers').innerHTML=study.quiz.opts.map(v=>`<button data-sanswer="${v}">${v}</button>`).join('');$$('[data-sanswer]').forEach(b=>b.onclick=()=>{if(state.hunt?.running||state.battle?.running||state.exploration?.active){toast('꼬물이가 다른 활동 중이야. 먼저 그 활동을 끝내야 해.');actions.sfx?.('error');return;}const ok=answerStudy(state,study.quiz,b.dataset.sanswer);$('#studyFeedback').textContent=ok?'정답! 능력치와 숙련도가 성장했어.':`오답. 정답은 ${study.quiz.ans}. 능력치는 내려가지 않아.`;pulseFx(ok?'정답':'오답');actions.sfx?.(ok?'reward':'error');actions.haptic?.(ok?'reward':'tap');window.PetLife.action(p,ok?'study_ok':'study_wrong');say(window.PetLife.line(p,ok?'study_ok':'study_wrong'));if(ok){recordNewbornCare('study');}study.quiz=makeQuiz(study.domain,study.difficulty,m.recentTypes);commit();});$('#masteryList').innerHTML=domains.map(d=>{const mm=p.mastery[d];return `<div class="meter"><span>${d}</span><div><i style="width:${clamp(mm.xp/(mm.level*45)*100,0,100)}%"></i></div><b>Lv.${mm.level}</b></div>`}).join('');const statDisplayMax={attack:52,defense:52,hp:120,agility:48,intelligence:52,evolution:46};$('#statList').innerHTML=stats.map(k=>`<div class="meter"><span>${statNames[k]}</span><div><i style="width:${clamp(p[k]/statDisplayMax[k]*100,2,100)}%"></i></div><b>${p[k].toFixed(1)}</b></div>`).join('');}
 function renderShop(){
 const category=it=>it.kind==='food'?'식료품':it.kind==='furniture'?'가구':it.kind==='boost'?'일용품':it.kind==='decor'?'꾸미기':'집 확장';
 const cats=['식료품','가구','일용품','꾸미기','집 확장'];
 const deptIcons=['🍎','🛋️','🧺','🎨','🏡'];
 const statLabel={attack:'공격',defense:'방어',hp:'체력',agility:'민첩',intelligence:'지능'};
 const effectText=it=>{
   const bits=[];
   if(it.kind==='food'){
     if(it.hunger)bits.push(`포만 +${it.hunger}`);
     if(it.mood)bits.push(`기분 +${it.mood}`);
     if(it.condition)bits.push(`컨디션 ${it.condition>0?'+':''}${it.condition}`);
     if(it.fatigue)bits.push(`피로 ${it.fatigue>0?'+':''}${it.fatigue}`);
     if(it.stat)Object.entries(it.stat).forEach(([k,v])=>bits.push(`${statLabel[k]||k} ${v>0?'+':''}${Math.round(v*100)}%`));
   }else if(it.kind==='furniture'&&it.actions?.length){bits.push(it.actions.slice(0,3).join(' · '));}
   else if(it.kind==='boost'&&it.boost){bits.push(`${it.boost.type==='study'?'학습':'자동성장'} 효율 +${Math.round((it.boost.rate||0)*100)}%`);}
   else if(it.kind==='decor'){bits.push('구매 후 바로 적용 가능');}
   else if(it.kind==='service'){bits.push('계정에 영구 적용');}
   return bits.join(' · ');
 };
 const cleanDesc=it=>({
   apple:'가볍게 배를 채우는 기본 과일.',banana:'일상적으로 먹이기 좋은 든든한 과일.',milk:'컨디션을 회복하고 잠시 방어력을 높여 줘.',nuts:'공부 전에 먹이면 잠시 지능이 올라가.',meat:'든든하게 먹고 잠시 공격력이 올라가.',veggie_soup:'포만도와 컨디션을 함께 회복하는 식사.',grain_bowl:'가격 대비 포만도가 높은 든든한 한 끼.',berry_yogurt:'기분과 친밀도를 함께 올려 주는 간식.',energy_jelly:'피로를 줄이고 잠시 민첩을 높여 줘.',study_cookie:'공부 효율을 크게 높이지만 컨디션이 조금 줄어.',power_steak:'공격력을 크게 높이는 대신 민첩과 피로에 부담이 있어.',calm_tea:'기분과 친밀도를 크게 올리고 피로를 줄여 줘.',special_snack:'기분과 친밀도를 크게 올리는 특별 간식.',
   bed:'잠자기와 뒹굴기 같은 휴식 행동을 할 수 있어.',bookshelf:'책을 고르고 읽는 생활 행동을 할 수 있어.',sofa:'앉거나 누워 쉬는 행동을 할 수 있어.',plant:'방을 꾸미고 화분을 돌보는 행동을 추가해.',window:'창밖 보기와 햇빛 쬐기 같은 행동을 추가해.',trampoline:'점프하며 노는 행동을 추가해.',training:'운동과 훈련 기록 확인 행동을 추가해.',desk:'공부와 낙서 같은 책상 행동을 추가해.',mirror:'거울 앞에서 포즈를 취하거나 머리를 정리해.',fridge:'간식을 찾는 생활 행동을 추가해.',console:'게임을 하며 노는 행동을 추가해.',lamp:'생활방에 부드러운 조명 분위기를 더해.',toybox:'장난감을 골라 노는 행동을 추가해.',easel:'그림을 그리고 작품을 보는 행동을 추가해.',bath:'목욕과 물놀이로 컨디션을 회복할 수 있어.',music:'음악을 듣고 춤추는 생활 행동을 추가해.',trophy:'배틀 기록을 방에 전시하고 반응할 수 있어.',wardrobe:'옷장을 열고 꾸미기에 반응하는 행동을 추가해.',ball:'공을 튀기고 따라다니며 노는 행동을 추가해.'
 })[it.id]||it.desc||'';
 if(!cats.includes(shopCategory))shopCategory=shopCategory==='먹이'?'식료품':'식료품';
 $('#shopCategory').innerHTML=cats.map(c=>`<option ${shopCategory===c?'selected':''}>${c}</option>`).join('');
 $('#shopCategory').onchange=e=>{shopCategory=e.target.value==='먹이'?'식료품':e.target.value;renderShop();};
 let tabs=$('#shopDepartments');if(!tabs){tabs=document.createElement('nav');tabs.id='shopDepartments';tabs.setAttribute('aria-label','상점 상품 분류');$('#shopGrid').before(tabs);}
 tabs.innerHTML=cats.map((c,i)=>`<button type="button" data-shop-dept="${c}" aria-pressed="${shopCategory===c}" class="${shopCategory===c?'active':''}"><span>${deptIcons[i]}</span><b>${c}</b></button>`).join('');
 tabs.querySelectorAll('button').forEach(b=>b.onclick=()=>{shopCategory=b.dataset.shopDept;renderShop();document.querySelector('#tab-shop .ambient-sheet')?.scrollTo({top:0,behavior:state.settings.motion?'smooth':'auto'});});
 const items=shops.filter(it=>it.service!=='petSlot'&&category(it)===shopCategory);
 const title=document.querySelector('#tab-shop .section-head h2'),subtitle=document.querySelector('#tab-shop .section-head p');if(title)title.textContent=shopCategory;if(subtitle)subtitle.textContent=({식료품:'먹이면 바로 효과가 적용돼.',가구:'방에 놓으면 펫의 행동이 더 다양해져.',일용품:'구매 즉시 적용되는 성장 보조 아이템이야.',꾸미기:'우리 집과 펫 주변을 취향대로 꾸며 봐.','집 확장':'보관 공간과 방 배치 한도를 영구적으로 늘려.'})[shopCategory]+` · ${items.length}종`;
 $('#shopGrid').innerHTML=items.map(it=>{const owned=ownedShopItem(state,it),equipped=it.kind==='decor'&&state.decor[it.slot]===it.id,disabled=owned&&!['decor','food','boost'].includes(it.kind),reapply=it.kind==='decor'&&owned;
 const label=reapply?(equipped?'적용 중':'다시 적용'):disabled?'보유 중':`★ ${it.price}`;
 const stock=it.kind==='food'?`보유 ${state.inventory[it.id]||0}개`:it.kind==='boost'?'구매 즉시 적용':equipped?'현재 적용 중':owned?'이미 보유':'구매 가능';
 const fx=effectText(it),desc=cleanDesc(it);
 const artMarkup=it.kind==='decor'?shopDecorPreview(it):it.kind==='boost'?shopBoostPreview(it):iconMarkup(it.id,it.kind==='food'?'🍎':it.kind==='furniture'?'🪑':it.kind==='boost'?'⚡':it.kind==='service'?'🏠':'✨',it.kind==='furniture'?'furniture':'items');
 return `<article class="shop-item department-card" data-shop-kind="${it.kind}"><div class="shop-product-art">${artMarkup}</div><div class="shop-copy"><div class="shop-title-row"><h3>${it.name}</h3><small class="shop-stock">${stock}</small></div>${fx?`<div class="shop-effect-line">${fx}</div>`:''}<p class="shop-desc">${desc}</p></div><button type="button" data-buy="${it.id}" aria-label="${it.name} ${reapply?'적용':it.price+'별로 구매'}" ${disabled||equipped?'disabled':''}>${label}</button></article>`;
 }).join('');
 $$('[data-buy]').forEach(b=>b.onclick=()=>{const r=buyItem(state,b.dataset.buy);commit(r.msg);});
 let sell=$('#sellPanel');if(!sell){sell=document.createElement('section');sell.id='sellPanel';sell.className='sell-panel';$('#shopGrid').after(sell);}const inv=inventorySellables(state);sell.innerHTML='<div class="section-head"><div><h3>보관함 판매</h3><p>필요 없는 물건을 별로 바꿀 수 있어.</p></div></div><div class="sell-grid">'+(inv.length?inv.map(it=>'<article class="sell-item rarity-'+it.rarity+'"><div><b>'+it.name+'</b><small>'+(rarityMeta[it.rarity]?.name||'일반')+' · '+it.qty+'개 보유</small>'+(it.effect?.label?'<em>◆ '+it.effect.label+'</em>':'')+'</div><button data-sell-one="'+it.id+'" '+(it.equipped?'disabled title="장착 해제 후 판매 가능"':'')+'>1개 · ★'+it.sell+'</button><button data-sell-all="'+it.id+'" '+(it.equipped?'disabled title="장착 해제 후 판매 가능"':'')+'>전부 · ★'+(it.sell*it.qty)+'</button></article>').join(''):'<p class="muted">지금 판매할 수 있는 물건이 없어.</p>')+'</div>';$$('[data-sell-one]').forEach(b=>b.onclick=()=>{const r=sellItem(state,b.dataset.sellOne,1);commit(r.msg);});$$('[data-sell-all]').forEach(b=>b.onclick=()=>{const x=inventorySellables(state).find(i=>i.id===b.dataset.sellAll);const r=sellItem(state,b.dataset.sellAll,x?.qty||1);commit(r.msg);});
 let gear=$('#equipmentPanel');if(!gear){gear=document.createElement('section');gear.id='equipmentPanel';gear.className='equipment-panel';sell.after(gear);}const allInv=inventorySellables(state),equipInv=allInv.filter(it=>it.effect?.mode==='equipped');const slotNames={charm:'부적',accessory:'장신구',relic:'유물'};gear.innerHTML=`<div class="section-head"><div><h3>장착 아이템</h3><p>슬롯마다 하나씩 장착할 수 있어.</p></div></div><div class="equip-slots">${Object.entries(slotNames).map(([slot,label])=>{const id=state.equipment?.[slot],it=id?allInv.find(x=>x.id===id):null;return `<article class="equip-slot ${it?'filled':''}"><small>${label}</small><b>${it?.name||'비어 있음'}</b>${it?.effect?.label?`<em>${it.effect.label}</em>`:''}${it?`<button data-unequip="${slot}">해제</button>`:''}</article>`}).join('')}</div><div class="equip-inventory">${equipInv.length?equipInv.map(it=>`<article class="equip-item rarity-${it.rarity}"><div><span class="rarity-badge rarity-${it.rarity}">${rarityMeta[it.rarity]?.name||'일반'}</span><b>${it.name}</b><small>${it.effect?.slot==='charm'?'부적':it.effect?.slot==='accessory'?'장신구':'유물'} · ${it.qty}개</small><em>${it.effect?.label||''}</em></div><button data-equip="${it.id}" ${it.equipped?'disabled':''}>${it.equipped?'장착 중':'장착'}</button></article>`).join(''):'<p class="muted">장착 가능한 아이템이 아직 없어.</p>'}</div>`;$$('[data-equip]').forEach(b=>b.onclick=()=>{const r=equipItem(state,b.dataset.equip);commit(r.msg);});$$('[data-unequip]').forEach(b=>b.onclick=()=>{const r=unequipItem(state,b.dataset.unequip);commit(r.msg);});for(const [id,title]of [['sellPanel','보관함 물건 판매'],['equipmentPanel','장비 관리']]){const panel=document.getElementById(id);if(panel&&!panel.parentElement.classList.contains('shop-extra')){const wrap=document.createElement('details');wrap.className='shop-extra';const summary=document.createElement('summary');summary.textContent=title;panel.before(wrap);wrap.append(summary,panel);}}}
 function renderHunt(){const h=state.hunt,p=mainPet(state),z=zones.find(x=>x.id===h.zone)||zones[0];if(!h.running){const ho=document.querySelector('#tab-hunt .hunt-options');if(ho&&ho.dataset.userOpened!=='1')ho.open=false;}$('#tab-hunt')?.classList.toggle('hunt-running',!!h.running);const huntSkills=skillsFor(p.starter,p.temporaryRegression?2:p.stage);$('#huntState').textContent=h.running?`${({idle:'둘러보는 중',walk:'걷는 중',wander:'탐색 중',chase:'쫓아가는 중',attack:'공격 중',engage:'대치 중',rest:'쉬는 중',pickup:'줍는 중',inspect:'살펴보는 중',interact:'조사 중'})[h.field.pet.state]||'탐색 중'}`:'대기';if($('#huntHudZone'))$('#huntHudZone').textContent=`${z.name} · ${h.running?'사냥 중':'대기'}`;if($('#huntHudWeather'))$('#huntHudWeather').textContent=`${h.timeOfDay} · ${h.weather}`;if($('#huntHudHp'))$('#huntHudHp').textContent=`HP ${Math.round(h.hp)}`;if($('#huntHudLoot'))$('#huntHudLoot').textContent=`처치 ${h.kills} · 거리 ${Math.round((h.field?.distance||0)*10)}m${(h.field?.enemies||[]).some(e=>e.boss)?' · BOSS':''}`;if($('#huntSkillHud'))$('#huntSkillHud').innerHTML=h.running?huntSkills.slice(0,2).map(sk=>`<span class="skill-chip">${sk.name}</span>`).join(''):'';$('#huntStart').textContent=h.running?'사냥 종료':`이곳으로 출발 · ★${HUNT_ENTRY_COST}`;$('#huntZones').innerHTML=zones.map(v=>{const locked=p.level<v.need;return `<button data-zone="${v.id}" class="hunt-zone-card ${h.zone===v.id?'active':''} ${locked?'locked':''}" ${h.running||locked?'disabled':''} style="--zone-img:url('assets/hunt/${v.id}.webp')"><span class="zone-art"></span><span class="zone-copy"><b>${v.name}</b><small>${locked?`Lv.${v.need}에 개방`:`Lv.${v.need}+ · 위험 ${v.danger}/6`}</small><em>${v.desc}</em></span><i>${h.zone===v.id?'선택됨':locked?'잠김':'선택'}</i></button>`}).join('');$$('[data-zone]').forEach(b=>b.onclick=()=>{h.zone=b.dataset.zone;commit();});const focus=$('#huntZoneFocus');if(focus){const locked=p.level<z.need,enemyIds=(zoneEnemyMap[z.id]||[]),enemyCards=enemyIds.map(id=>{const enemy=huntEnemies.find(e=>e.id===id);if(!enemy)return '';const src=assetPath('monsters',id);return `<div class="hunt-monster-chip"><canvas class="hunt-monster-canvas" data-monster-id="${id}" width=96 height=72 aria-hidden="true"></canvas><b>${enemy.name}</b><small>${enemy.type==='guard'?'방어형':enemy.type==='speed'?'속도형':enemy.type==='smart'?'지능형':enemy.type==='burst'?'폭발형':'균형형'}</small></div>`;}).join(''),lootIds=(zoneLootMap[z.id]||['material']),lootCards=lootIds.map(id=>{const it=itemCatalog[id]||itemInfo(id),src=itemIconPath(id),rarity=it.rarity||'common',rm=rarityMeta[rarity]||rarityMeta.common;return `<div class="hunt-loot-chip rarity-${rarity}"><span class="hunt-loot-art" ${src?`style="background-image:url('${src}?rev=${encodeURIComponent(BUILD_REV)}')"`:''}></span><b>${it.name||id}</b><small>${rm.name}</small></div>`;}).join('');focus.innerHTML=`<div class="hunt-zone-focus-art" style="background-image:url('assets/hunt/${z.id}.webp')"></div><div><small>선택한 사냥터</small><b>${z.name}</b><p>${z.desc}</p><span>권장 Lv.${z.need}+ · 위험도 ${'◆'.repeat(z.danger)}${'◇'.repeat(Math.max(0,6-z.danger))} · 보상 배율 ×${z.reward}</span><div class="hunt-monster-preview"><em>출현 몬스터</em><div class="hunt-monster-row">${enemyCards}</div></div><div class="hunt-loot-preview"><em>획득 가능 아이템</em><div class="hunt-loot-row">${lootCards}</div></div></div>`;focus.classList.toggle('locked',locked);$('#huntStart').disabled=locked&&!h.running;}{const remain=h.running?Math.max(0,h.nextUpkeepAt-Date.now()):0,rm=Math.floor(remain/60000),rs=Math.floor((remain%60000)/1000);
$('#huntStats').innerHTML=`<div class="meter"><span>사냥 HP</span><div><i style="width:${h.hp}%"></i></div><b>${Math.round(h.hp)}</b></div><p>처치 ${h.kills} · 탐색 ${Math.round((h.field?.distance||0)*10)}m · 상자 ${(h.field?.chests||[]).filter(c=>!c.opened).length} · 희귀 ${h.rare}</p><p><b>출전 ★${HUNT_ENTRY_COST}</b> · 유지비 ${HUNT_UPKEEP_MINUTES}분마다 ★${HUNT_UPKEEP_COST}${h.running?` · 다음 ${rm}:${String(rs).padStart(2,'0')}`:''}</p><p class="muted">이번 사냥 지출 ★${h.spent||0} · ${h.event||z.desc}</p>`;}for(const key of ['hpReturn','hungerReturn','conditionReturn','maxMinutes','targetItems']){const el=$(`#hunt-${key}`);if(el){el.value=h.settings[key];el.onchange=e=>{h.settings[key]=Number(e.target.value);commit();};}}let extra=$('#huntExtraSettings');if(!extra){extra=document.createElement('div');extra.id='huntExtraSettings';extra.innerHTML='<label>인벤토리 수량 상한<input id="hunt-maxInventory" type="number" min="5" max="999"></label><button data-hunt-action="target">🎯 강한 적 우선 토글</button><label class="check"><input id="hunt-minimalUI" type="checkbox"> 최소 UI 모드</label>';$('#hunt-targetItems').closest('section').append(extra);}const invCap=huntInventoryCapacity(state);$('#hunt-maxInventory').max=invCap;$('#hunt-maxInventory').value=Math.min(h.settings.maxInventory,invCap);$('#hunt-maxInventory').onchange=e=>{h.settings.maxInventory=Math.min(Number(e.target.value),invCap);commit();};$('#hunt-minimalUI').checked=h.settings.minimalUI;$('#hunt-minimalUI').onchange=e=>{h.settings.minimalUI=e.target.checked;document.body.classList.toggle('hunt-minimal',h.settings.minimalUI&&state.ui.tab==='hunt');commit();};document.body.classList.toggle('hunt-minimal',h.settings.minimalUI&&state.ui.tab==='hunt');if(!extra.querySelector('[data-hunt-action="target"]')){const targetButton=document.createElement('button');targetButton.dataset.huntAction='target';targetButton.textContent='강한 적 우선 전환';extra.append(targetButton);}extra.querySelector('[data-hunt-action="target"]').onclick=()=>commit(huntIntervention(state,'target'));}
 function walkSpriteMeta(p,stage=p.stage){const s=Number(stage||0);if(s===0)return {stage:0,modern:true,rows:12,frames:6};const r=resolvePetAsset(p.starter,Math.max(1,Math.min(4,s))),modern=r.format==='modern24';return {stage:s,modern,rows:modern?24:22,frames:modern?6:4,path:r.path};}
 function walkSpriteRowIndex(meta,dir='right',moving=true){if(Number(meta.stage||0)===0){if(!moving)return 0;return dir==='left'?1:dir==='right'?2:0;}if(!moving)return dir==='up'?1:dir==='down'?0:2;return dir==='up'?4:dir==='down'?3:5;}
 function applyWalkSpritePose(el,meta,dir='right',moving=true){if(!el||!meta)return;const row=walkSpriteRowIndex(meta,dir,moving),y=((row/Math.max(1,meta.rows-1))*100).toFixed(4)+'%';el.classList.toggle('walk-four',meta.frames===4);el.classList.toggle('walk-six',meta.frames!==4);el.style.setProperty('--walk-bg-y',y);el.style.setProperty('--walk-dir',dir==='left'?'-1':'1');}
 function renderWalkSprite(el,p,stage=p.stage){if(!el||!p)return null;const meta=walkSpriteMeta(p,stage),s=Number(stage||0);el.className='walk-pet-sprite '+(s===0?'walk-newborn':'');if(s===0){el.style.backgroundImage=`url("assets/pets/common_stage0_6x12.png?rev=${encodeURIComponent(BUILD_REV)}")`;el.style.setProperty('--walk-bg-w','600%');el.style.setProperty('--walk-bg-h','1200%');}else{const r=resolvePetAsset(p.starter,Math.max(1,Math.min(4,s))),modern=r.format==='modern24';el.style.backgroundImage=`url("${r.path}?rev=${encodeURIComponent(BUILD_REV)}")`;el.style.setProperty('--walk-bg-w',modern?'600%':'400%');el.style.setProperty('--walk-bg-h',modern?'2400%':'2200%');}applyWalkSpritePose(el,meta,'right',true);return meta;}
 function renderExplore(){
 const p=mainPet(state),a=state.exploration.active,stage=p.temporaryRegression?2:p.stage,petEl=$('#walkPetSprite'),friendEl=$('#walkFriendActor'),meetFx=$('#walkMeetFx');
 const petMeta=renderWalkSprite(petEl,p,stage);const startBtn=$('#walkStart'),back=$('#walkBack'),ev=$('#walkEvent');
 const clearFriend=()=>{petEl?.classList.remove('meeting','talking','listening');friendEl?.classList.add('hidden');friendEl?.classList.remove('meeting','stage0','talking','listening');meetFx?.classList.add('hidden');if(friendEl)friendEl.dataset.eventId='';ev?.classList.remove('from-friend','from-player','gift-moment','farewell');};
 if(a?.kind==='walk'){
  const pct=clamp(a.progressMs/a.durationMs*100,0,100),left=Math.max(0,Math.ceil((a.durationMs-a.progressMs)/1000)),mm=String(Math.floor(left/60)).padStart(2,'0'),ss=String(left%60).padStart(2,'0');
  // Walk along the visible garden path instead of hovering in one fixed spot.
  // Waypoints are percentages of the walk stage and follow the actual path in assets/rooms/garden.webp.
  if(petEl&&!a.event){
   const t=pct/100,stageNum=Number(stage||0);let x=47,y=12,dirName='right',scale=1;
   if(stageNum===0){
    const pts=[[36,18],[56,24],[39,33],[59,42],[41,52],[58,63],[40,75],[55,87]],seg=(pts.length-1)*t,i=Math.min(pts.length-2,Math.floor(seg)),u=seg-i,[x0,y0]=pts[i],[x1,y1]=pts[i+1];
    x=x0+(x1-x0)*u;y=y0+(y1-y0)*u;dirName=x1>=x0?'right':'left';scale=.99+y*.0018;
   }else{
    const pts=[[47,10],[46,18],[43,27],[45,37],[52,47],[60,57],[62,68],[58,80],[50,90]],seg=(pts.length-1)*t,i=Math.min(pts.length-2,Math.floor(seg)),u=seg-i,[x0,y0]=pts[i],[x1,y1]=pts[i+1],dx=x1-x0,dy=y1-y0;
    x=x0+(x1-x0)*u;y=y0+(y1-y0)*u;dirName=Math.abs(dx)>=Math.abs(dy)*1.15?(dx>=0?'right':'left'):(dy>=0?'down':'up');scale=1.03+y*.0015;
   }
   petEl.style.setProperty('--walk-x',`${x}%`);petEl.style.setProperty('--walk-y',`${y}%`);petEl.style.setProperty('--walk-scale',scale.toFixed(3));applyWalkSpritePose(petEl,petMeta,dirName,true);
  }
  $('#walkClock').textContent=`${mm}:${ss}`;$('#walkProgressBar').style.width=`${pct}%`;$('#walkProgressText').textContent=`${Math.floor(pct)}%`;$('#walkDistance').textContent=`${Math.round(a.distance)}m`;$('#walkXp').textContent=`+${a.xpEarned.toFixed(1)}`;$('#walkEvolution').textContent=`+${a.evolutionGain.toFixed(2)}`;$('#exploreActive').innerHTML='<b>산책 중</b><span></span>';startBtn.textContent='산책 중';startBtn.disabled=true;back.textContent='← 집으로';
  if(a.event){
   if(a.event.kind==='friend'){
    petEl?.classList.add('meeting');meetFx?.classList.remove('hidden');
    const style=a.event.stage===0?{path:`assets/pets/common_stage0_6x12.png?rev=${encodeURIComponent(BUILD_REV)}`,w:'600%',h:'1200%'}:(()=>{const r=resolvePetAsset(a.event.starter,Math.max(1,a.event.stage)),modern=r.format==='modern24';return {path:`${r.path}?rev=${encodeURIComponent(BUILD_REV)}`,w:modern?'600%':'400%',h:modern?'2400%':'2200%'};})();
    if(friendEl){friendEl.style.backgroundImage=`url("${style.path}")`;friendEl.style.setProperty('--friend-bg-w',style.w);friendEl.style.setProperty('--friend-bg-h',style.h);friendEl.classList.toggle('stage0',a.event.stage===0);friendEl.classList.remove('hidden');if(friendEl.dataset.eventId!==a.event.id){friendEl.dataset.eventId=a.event.id;friendEl.classList.remove('meeting');void friendEl.offsetWidth;friendEl.classList.add('meeting');}}
    const elapsed=Math.max(0,a.progressMs-(a.event.startedAtMs||a.progressMs));
    const friendTalk=elapsed>=1700&&elapsed<4200,playerTalk=elapsed>=4200&&elapsed<6700,giftTalk=!!a.event.giftName&&elapsed>=6700&&elapsed<9000,farewell=elapsed>=9000;
    ev.classList.remove('from-friend','from-player','gift-moment','farewell');
    petEl?.classList.toggle('talking',playerTalk);petEl?.classList.toggle('listening',friendTalk||giftTalk);friendEl?.classList.toggle('talking',friendTalk||giftTalk);friendEl?.classList.toggle('listening',playerTalk);
    if(friendTalk){ev.classList.add('from-friend');ev.innerHTML=`<small>${a.event.stage}단계 ${a.event.name}</small><b>“${a.event.text}”</b>`;ev.classList.remove('hidden');}
    else if(playerTalk){ev.classList.add('from-player');ev.innerHTML=`<small>${p.name}</small><b>“${a.event.reply||'응! 산책하다 또 만나자.'}”</b>`;ev.classList.remove('hidden');}
    else if(giftTalk){ev.classList.add('from-friend','gift-moment');ev.innerHTML=`<small>${a.event.name}</small><b>“이거 하나 가져가!”</b><em>🎁 ${a.event.giftName}을 건네줬어</em>`;ev.classList.remove('hidden');}
    else if(farewell){ev.classList.add('farewell');ev.innerHTML=`<small>친구와 인사</small><b>“다음 산책 때 또 만나!”</b>`;ev.classList.remove('hidden');}
    else ev.classList.add('hidden');
   }else{
    clearFriend();ev.innerHTML=`<small>산책 중 발견</small><b>${a.event.title}</b><p>${a.event.text}</p>`;ev.classList.remove('hidden');
   }
  }else{clearFriend();ev.classList.add('hidden');}
  $('#walkLog').innerHTML=(a.log||[]).map(x=>`<div>${x.text}</div>`).join('');
 }else{
  clearFriend();$('#walkClock').textContent='03:00';$('#walkProgressBar').style.width='0%';$('#walkProgressText').textContent='0%';$('#walkDistance').textContent='0m';$('#walkXp').textContent='+0.0';$('#walkEvolution').textContent='+0.00';$('#exploreActive').innerHTML='<b>3분 산책</b><span></span>';ev.classList.add('hidden');$('#walkLog').innerHTML='';startBtn.textContent='3분 산책 시작';startBtn.disabled=!!(state.hunt?.running||state.battle?.running);back.textContent='← 집';
 }
} function renderBattle(){const b=state.battle,p=mainPet(state);if(!b.running&&!['spar','green_slime','mushroom','fox','golem','shadowbat','scarab','shellbug','firemage','minotaur','leafling','drone'].includes(b.enemyId)){b.enemyId='spar';b.enemyName='슬라임';b.enemyType='balanced';b.enemyLevel=1;b.enemyHp=0;b.enemyMax=0;}const temp=b.tempEvolution,combatStarter=temp?.starter||p.starter,combatStage=temp?1:(p.temporaryRegression?2:p.stage);$('#tab-battle')?.classList.toggle('battle-running',!!b.running);const battleSkills=skillsFor(combatStarter,combatStage);$('#predictedRate').textContent=`예상 승률 ${predictedWinRate(state)}%`;if($('#battleHudEnemy'))$('#battleHudEnemy').textContent=b.running?`${b.enemyName} · Lv.${b.enemyLevel}`:'PVE 연습장';if($('#battleHudState'))$('#battleHudState').textContent=b.running?(b.awakened?'4단계 각성':temp?`임시 1단계 · ${temp.name}`:'전투 중'):'준비';if($('#battleSkillHud'))$('#battleSkillHud').innerHTML=b.running?battleSkills.slice(0,2).map(sk=>`<span class="skill-chip ${b.skillCooldowns?.[sk.id]>0?'cooling':''}">${sk.name}</span>`).join(''):'';$('#battleStart').disabled=b.running;$('#battleStart').textContent=b.running?'자동 전투 진행 중':'배틀 시작';$('#myHp').style.width=`${b.running?b.myHp/b.myMax*100:100}%`;$('#enemyHp').style.width=`${b.running?b.enemyHp/b.enemyMax*100:100}%`;$('#myGauge').style.width=`${b.myGauge||0}%`;$('#ult').style.width=`${b.ult||0}%`;$('#awaken').style.width=`${b.awaken||0}%`;$('#battleMeta').textContent=b.running?`${b.enemyName} Lv.${b.enemyLevel} · ${({balanced:'균형',guard:'방어',speed:'속도',smart:'지능',burst:'공격'})[b.enemyType]||'균형'}형 · 연속정답 ${b.streak}${b.awakened?' · 4단계 각성중':temp?` · 임시진화 ${temp.name}`:''}`:`${p.wins}승 ${p.battles-p.wins}패 · 최고 ${p.bestWinStreak}연승`;if(b.running){if(!battleQuiz){const d=domains[Math.floor(Math.random()*domains.length)],m=p.mastery[d];battleQuiz=makeQuiz(d,['쉬움','보통','어려움','도전'][Math.floor(Math.random()*4)],m.recentTypes);}$('#battleQuestion').innerHTML=`${battleQuiz.q}<small class="question-type">${battleQuiz.domain} · ${battleQuiz.label}</small>`;$('#battleAnswers').innerHTML=battleQuiz.opts.map(v=>`<button data-banswer="${v}">${v}</button>`).join('');$$('[data-banswer]').forEach(el=>el.onclick=()=>{const r=answerBattle(state,battleQuiz,el.dataset.banswer);actions.logBattle(r.msg);pulseFx(r.ok?'정답':'오답');actions.sfx?.(r.ok?'battle':'error');actions.haptic?.(r.ok?'reward':'tap');const d=domains[Math.floor(Math.random()*domains.length)],m=p.mastery[d];battleQuiz=makeQuiz(d,['쉬움','보통','어려움','도전'][Math.floor(Math.random()*4)],m.recentTypes);commit();});}else{$('#battleQuestion').innerHTML='배틀 시작을 누르면 펫이 자동으로 싸워. <small class="question-type">문제를 맞히면 HP 회복 · 필살기/각성 게이지 상승 · 연속 정답으로 각성 도움</small>';$('#battleAnswers').innerHTML='';battleQuiz=null;}$('#battleLog').innerHTML=(b.logs||[]).map(x=>`<div>${x}</div>`).join('')||'<div>전투를 시작하면 기록이 여기에 쌓여.</div>';}
 function renderPets(){const main=mainPet(state);$('#petCards').innerHTML=state.pets.map(p=>{const rel=state.pets.filter(q=>q.id!==p.id).map(q=>{const v=p.relationships[q.id]||0,label=v>=80?'단짝':v>=55?'친구':v<=-35?'경쟁자':v<=5?'라이벌':'아는 사이';return `${q.name}:${label}`;}).join(' · ')||'아직 관계 없음';return `<article class="pet-card ${p.id===main.id?'selected':''}"><h3>${p.name}</h3><p>${p.species} · Lv.${p.level} · ${p.stage}단계</p><p>${p.primary} + ${p.secondary}</p><p>${rel}</p><button data-mainpet="${p.id}" ${p.id===main.id?'disabled':''}>메인 펫 지정</button></article>`}).join('');$$('[data-mainpet]').forEach(b=>b.onclick=()=>{if(window.PetLife.busy(state)){toast('출전한 펫이 돌아오면 바꿀 수 있어.');return;}state.mainPetId=b.dataset.mainpet;commit('돌볼 펫을 바꿨어.');});$('#jointInfo').textContent=`펫 공간 ${state.pets.length}/${state.home.petSlots} · 새 펫 만나기 ★25. `+(state.pets.length>=2?'합동 훈련은 관계도와 소량 성장, 추억 기록을 함께 만든다.':'펫이 두 마리 이상 필요해.');$('#addPet').disabled=state.pets.length>=2||window.PetLife.busy(state);}
 function renderRecord(){const p=mainPet(state),s=computeScores(state),days=Math.max(1,Math.ceil((Date.now()-p.bornAt)/86400000));$('#scoreCards').innerHTML=[['육성',s.growth],['학습',s.study],['배틀',s.battle],['일일',s.daily],['종합',s.total],['등급',`${s.grade} / ${s.petGrade}`]].map(([n,v])=>`<div><b>${v}</b><span>${n}</span></div>`).join('');const acc=p.totalQuestions?Math.round(p.correct/p.totalQuestions*100):0;$('#recordTable').innerHTML=[['태어난 날',new Date(p.bornAt).toLocaleDateString()],['함께한 일수',`${days}일`],['총 문제',p.totalQuestions],['정답률',`${acc}%`],['최고 연속정답',p.bestStreak],['배틀',`${p.wins}승 ${p.battles-p.wins}패`],['최고 연승',p.bestWinStreak],['성장 경로',p.growthPath.join(' → ')],['가출/귀환',`${p.runaways}/${p.returns}`],['자동사냥 처치',p.huntKills],['희귀 발견',p.rareFinds],['좋아하는 가구',shops.find(x=>x.id===p.favoriteFurniture)?.name||p.favoriteFurniture||'아직 없음']].map(([a,b])=>`<tr><td>${a}</td><td>${b}</td></tr>`).join('');const passive=ownedPassiveEffects(state),passTxt=Object.entries(passive).filter(([,v])=>Math.abs(v)>.0001).map(([k,v])=>`${effectNames[k]||k} ${v>0?'+':''}${(v*100).toFixed(1)}%`).join(' · ');$('#codex').innerHTML=`<b>소유/배치 효과</b><br>${passTxt||'적용 중인 효과 없음'}<hr>종족 ${state.codex.species.length}/6<br>성장형 ${state.codex.evolutions.length}<br>사냥터 ${state.codex.zones.length}/${zones.length}<br>산책 기록 ${state.codex.exploration.includes('walk')?'완료':'미완료'}<br>칭호 ${state.codex.titles.length}<br>가구 ${state.codex.furniture.length}<br>꾸미기 ${state.codex.decor.length}<br>각성 ${state.codex.awaken?'발견':'미발견'}`;$('#titleList').innerHTML=(p.titles.length?p.titles:['아직 칭호 없음']).map(t=>t==='아직 칭호 없음'?`<span>${t}</span>`:`<button class="chip ${p.representativeTitle===t?'selected':''}" data-title="${t}">${t}</button>`).join('');$$('[data-title]').forEach(b=>b.onclick=()=>{setRepresentativeTitle(state,b.dataset.title);commit('대표 칭호를 바꿨어.');});const diary=p.diary.map(d=>({t:d.t,text:`[일기] ${d.text}`})),all=[...p.memories,...diary].sort((a,b)=>b.t-a.t).slice(0,60);$('#memories').innerHTML=all.map(m=>`<div><small>${new Date(m.t).toLocaleString()}</small><br>${m.text}</div>`).join('')||'<div>아직 기록이 없어.</div>';}
 function renderEvents(){const si=seasonInfo(state),ws=weeklyLeague(state);const seasonItems=seasonShop(state);$('#seasonInfo').innerHTML=`<h3>${si.name} 시즌</h3><p>${si.bonus}</p><p>시즌 장식: ${si.decor}<br>시즌 칭호: ${si.title}</p><h3>시즌 상점</h3><div class="button-grid">${seasonItems.map(it=>`<button data-season-buy="${it.id}">★ ${it.price} · ${it.name}</button>`).join('')}</div>`;$('#seasonClaim').disabled=si.claimed;$('#seasonClaim').textContent=si.claimed?'시즌 선물 수령 완료':'시즌 선물 받기';$$('[data-season-buy]').forEach(b=>b.onclick=()=>{const r=buySeasonItem(state,b.dataset.seasonBuy);commit(r.msg);});$('#leagueList').innerHTML=`<button id="weeklyLeagueBtn"><b>주간 로컬 리그</b><small>${ws.week} · ${ws.wins}승/${ws.plays}전 · 최고 ${ws.bestScore}</small></button>`+leagueCups.map(c=>`<button data-cup="${c.id}"><b>${c.name}</b><small>${c.desc}</small></button>`).join('');$('#weeklyLeagueBtn').onclick=()=>{const r=enterWeeklyLeague(state);commit(r.msg);};$$('[data-cup]').forEach(b=>b.onclick=()=>{const r=enterLeague(state,b.dataset.cup);commit(r.msg);});}
 function renderSettings(){$('#quality').value=state.settings.quality;document.body.dataset.quality=state.settings.quality;$('#musicToggle').checked=state.settings.music;$('#sfxToggle').checked=state.settings.sfx;$('#hapticsToggle').checked=state.settings.haptics;$('#motionToggle').checked=state.settings.motion;document.body.classList.toggle('reduce-motion',!state.settings.motion);$('#fullscreenBtn').textContent=document.fullscreenElement?'⛶ 전체화면 종료':'⛶ 전체화면 전환';}
 const foodDrawer=()=>$('#foodDrawer');
 const inventoryDrawer=()=>$('#inventoryDrawer');
 function openInventoryDrawer(){const d=inventoryDrawer();if(!d)return;closeFoodDrawer();$$('.shortcut-sheet').forEach(x=>x.removeAttribute('open'));renderHomeInventory();d.classList.add('open');d.setAttribute('aria-hidden','false');actions.sfx?.('sheet_open');}
 function closeInventoryDrawer(){const d=inventoryDrawer();if(!d)return;d.classList.remove('open');d.setAttribute('aria-hidden','true');}
 function openFoodDrawer(){const d=foodDrawer();if(!d)return;closeInventoryDrawer();petReaction('food');actions.sfx?.('sheet_open');d.classList.add('open');d.setAttribute('aria-hidden','false');document.querySelector('.pet-more-float')?.removeAttribute('open');}
 function closeFoodDrawer(){const d=foodDrawer();if(!d)return;d.classList.remove('open');d.setAttribute('aria-hidden','true');}
 function bind(){
  $$('[data-tab]').forEach(b=>b.onclick=()=>tab(b.dataset.tab));const furnShop=$('#furnitureShopShortcut');if(furnShop)furnShop.onclick=()=>{shopCategory='가구';tab('shop');};
  $$('[data-action]').forEach(b=>b.onclick=()=>{if(b.dataset.action==='feed'){openFoodDrawer();return;}const act=b.dataset.action,msg=interact(state,act);recordNewbornCare(act);petReaction(act==='talk'?'talk':act==='play'?'play':'heart');if(act==='play'){const rc=$('#roomCanvas');if(rc){const now=Date.now();rc._petHappyUntil=now+4200;rc._petPlayUntil=now+4200;rc._petPlayStart=now;rc._petPlayEnd=now+4200;delete rc._petPlayScene;}window.PetLife.action?.(mainPet(state),'happy',2400);}actions.sfx?.(act==='talk'?'talk':act==='play'?'play':act==='train'?'train':act==='praise'?'pet_happy':'pet_happy');say(msg);commit();});
  const playShortcut=$('#playShortcut');if(playShortcut)playShortcut.onclick=e=>{e.preventDefault();e.stopPropagation();startHomePlay();};
  const invShortcut=$('#inventoryShortcut');if(invShortcut)invShortcut.onclick=openInventoryDrawer;const hz=$('#huntZones');if(hz&&!hz.dataset.dragScroll){hz.dataset.dragScroll='1';let ds=null;hz.addEventListener('pointerdown',e=>{ds={id:e.pointerId,x:e.clientX,left:hz.scrollLeft,moved:false};hz.setPointerCapture?.(e.pointerId);});hz.addEventListener('pointermove',e=>{if(!ds||ds.id!==e.pointerId)return;const dx=e.clientX-ds.x;if(Math.abs(dx)>5)ds.moved=true;if(ds.moved){hz.scrollLeft=ds.left-dx;e.preventDefault();}});const end=e=>{if(ds?.moved)e.preventDefault();ds=null;};hz.addEventListener('pointerup',end);hz.addEventListener('pointercancel',()=>ds=null);} const invClose=$('#inventoryDrawerClose');if(invClose)invClose.onclick=closeInventoryDrawer;$$('[data-close-shortcut]').forEach(b=>b.onclick=e=>{e.preventDefault();e.stopPropagation();const d=document.getElementById(b.dataset.closeShortcut);if(d)d.removeAttribute('open');actions.sfx?.('sheet_close');});
  $('#foodDrawerClose').onclick=closeFoodDrawer;$('#foodShopBtn').onclick=()=>{closeFoodDrawer();tab('shop');setTimeout(()=>{const c=$('#shopCategory');if(c){c.value='식료품';c.dispatchEvent(new Event('change'));}},0);};$$('[data-open-shortcut]').forEach(b=>b.onclick=()=>{const id=b.dataset.openShortcut;const reveal=()=>{$$('.shortcut-sheet').forEach(x=>x.removeAttribute('open'));const d=document.getElementById(id);if(d){d.setAttribute('open','');d.classList.add('jelly-opening');setTimeout(()=>d.classList.remove('jelly-opening'),300);actions.sfx?.('sheet_open');}document.querySelector('.pet-more-float')?.removeAttribute('open');};if(b.hasAttribute('data-home-shortcut')&&state.ui.tab!=='home'){tab('home');requestAnimationFrame(()=>requestAnimationFrame(reveal));}else reveal();});
  document.addEventListener('pointerdown',e=>{const b=e.target.closest('button');if(!b||b.disabled)return;b.classList.add('is-pressed');actions.tap?.();},{passive:true});
  document.addEventListener('pointerup',e=>e.target.closest('button')?.classList.remove('is-pressed'),{passive:true});
  document.addEventListener('pointercancel',()=>$$('button.is-pressed').forEach(b=>b.classList.remove('is-pressed')),{passive:true});
  document.querySelector('#tab-hunt .hunt-options>summary')?.addEventListener('click',()=>{const d=document.querySelector('#tab-hunt .hunt-options');if(d)d.dataset.userOpened=d.open?'0':'1';});const jellyDetails=()=>{const selector='.shortcut-sheet,.folded-card,.progress-sheet,.hunt-options,.battle-log-sheet';$$(selector).forEach(d=>{if(d.dataset.jellyBound)return;d.dataset.jellyBound='1';const s=d.querySelector(':scope>summary');if(!s)return;s.addEventListener('click',e=>{if(d.open){e.preventDefault();d.classList.add('jelly-closing');actions.sfx?.('sheet_close');setTimeout(()=>{d.open=false;d.classList.remove('jelly-closing');},state.settings.motion?185:0);}else{actions.sfx?.('sheet_open');requestAnimationFrame(()=>d.classList.add('jelly-opening'));setTimeout(()=>d.classList.remove('jelly-opening'),300);}});});};jellyDetails();const profileBtn=$('#petProfileBtn');if(profileBtn)profileBtn.addEventListener('click',()=>{const d=$('#petInfoDrawer');if(!d)return;$$('.shortcut-sheet').filter(x=>x!==d).forEach(x=>x.removeAttribute('open'));if(d.open){d.classList.add('jelly-closing');actions.sfx?.('sheet_close');setTimeout(()=>{d.open=false;d.classList.remove('jelly-closing');},state.settings.motion?185:0);}else{d.open=true;d.classList.add('jelly-opening');actions.sfx?.('sheet_open');setTimeout(()=>d.classList.remove('jelly-opening'),300);}});
  const rc=$('#roomCanvas');let dragFurniture=null,petGesture=null,tapBurst={count:0,lastAt:0,timer:0};if(rc){const pos=e=>{const r=rc.getBoundingClientRect();return {x:(e.clientX-r.left)/r.width,y:(e.clientY-r.top)/r.height};};const onPet=p=>{const h=rc._petHit;if(!h)return false;return Math.abs(p.x-h.x)<=Math.max(.11,h.rx||.11)&&Math.abs(p.y-h.y)<=Math.max(.13,h.ry||.13);};const clearBurst=()=>{if(tapBurst.timer)clearTimeout(tapBurst.timer);tapBurst={count:0,lastAt:0,timer:0};};const normalTap=()=>{const msg=interact(state,'pet');recordNewbornCare('pet');petReaction('heart');rc._petHappyUntil=Date.now()+620;actions.sfx?.('pet_happy');say(msg);commit();};const rapidTap=()=>{const now=performance.now();if(now-tapBurst.lastAt>520)clearBurst();tapBurst.count++;tapBurst.lastAt=now;if(tapBurst.timer)clearTimeout(tapBurst.timer);if(tapBurst.count>=3){clearBurst();const msg=interact(state,'hit');petReaction('hit');actions.sfx?.('hit');actions.haptic?.('hit');say(msg);commit();rc._petImpactUntil=Date.now()+260;rc._petHurtUntil=Date.now()+520;rc.classList.add('pet-bonk');setTimeout(()=>rc.classList.remove('pet-bonk'),240);}else tapBurst.timer=setTimeout(()=>{if(tapBurst.count>0)normalTap();clearBurst();},260);};const clearGesture=()=>{if(petGesture?.timer)clearTimeout(petGesture.timer);rc._petDrag=null;rc.classList.remove('pet-grabbed','pet-shaking');petGesture=null;};rc.addEventListener('pointerdown',e=>{const p=pos(e);if(onPet(p)){petGesture={id:e.pointerId,start:p,last:p,prev:p,at:performance.now(),moved:0,held:false,shakeScore:0,lastAxis:0,scolded:false,timer:setTimeout(()=>{if(!petGesture)return;petGesture.held=true;rc._petDrag={active:true,x:petGesture.last.x,y:petGesture.last.y};rc.classList.add('pet-grabbed');petReaction('hold');actions.sfx?.('squish');actions.haptic?.('tap');},280)};rc.setPointerCapture?.(e.pointerId);e.preventDefault();return;}let best=null,bd=.13;for(const f of state.furniturePlaced.filter(v=>v.room===state.currentRoom)){const d=Math.hypot(p.x-f.x,p.y-f.y);if(d<bd){best=f;bd=d;}}if(best){dragFurniture=best.id;rc.setPointerCapture?.(e.pointerId);e.preventDefault();}});rc.addEventListener('pointermove',e=>{const p=pos(e);if(petGesture&&petGesture.id===e.pointerId){const g=petGesture;g.last=p;g.moved=Math.max(g.moved,Math.hypot(p.x-g.start.x,p.y-g.start.y));if(g.held){rc._petDrag={active:true,x:p.x,y:p.y};const dx=p.x-g.prev.x,dy=p.y-g.prev.y,dominant=Math.abs(dx)>Math.abs(dy)?dx:dy,axis=Math.abs(dx)>Math.abs(dy)?1:2;if(Math.abs(dominant)>.018){if(g.lastAxis&&Math.sign(dominant)!==Math.sign(g.lastAxis)&&Math.abs(g.lastAxis)===axis)g.shakeScore++;g.lastAxis=Math.sign(dominant)*axis;g.prev=p;}if(g.shakeScore>=5&&!g.scolded){g.scolded=true;rc._petScoldUntil=Date.now()+520;rc._petCryUntil=Date.now()+900;rc.classList.add('pet-shaking');const msg=interact(state,'scold');petReaction('scold');actions.sfx?.('scold');actions.haptic?.('tap');say(msg);commit();setTimeout(()=>rc.classList.remove('pet-shaking'),420);}}else if(g.moved>.035&&performance.now()-g.at>80){if(g.timer){clearTimeout(g.timer);g.timer=0;}g.held=true;rc._petDrag={active:true,x:p.x,y:p.y};rc.classList.add('pet-grabbed');petReaction('hold');actions.sfx?.('squish');actions.haptic?.('tap');}return;}if(!dragFurniture)return;setFurniturePosition(state,dragFurniture,p.x,p.y);});rc.addEventListener('pointerup',e=>{const p=pos(e);if(petGesture&&petGesture.id===e.pointerId){const g=petGesture,dur=performance.now()-g.at,dist=Math.hypot(p.x-g.start.x,p.y-g.start.y);if(g.timer)clearTimeout(g.timer);if(g.scolded){clearGesture();return;}if(g.held){const floorY=clamp(.69+(p.x-.5)*.02,.66,.74),dropFrom=clamp(p.y,.16,.78);rc._petDrop={x:clamp(p.x,.12,.88),fromY:dropFrom,toY:floorY,start:performance.now(),duration:520};rc.classList.add('pet-dropping');actions.sfx?.('squish');actions.haptic?.('tap');clearGesture();setTimeout(()=>{rc.classList.remove('pet-dropping');petReaction('play');const msg=interact(state,'hold');say(dropFrom<.48?'앗! 착지했어!':msg);actions.sfx?.('land');commit();},540);return;}if(dist>.075||dur<230&&dist>.035){clearBurst();const msg=interact(state,'play');recordNewbornCare('play');petReaction('play');rc._petHappyUntil=Date.now()+760;actions.sfx?.('play');say(msg);commit();clearGesture();return;}rapidTap();$('#petGestureHint')?.classList.add('used');clearGesture();return;}if(!dragFurniture)return;setFurniturePosition(state,dragFurniture,p.x,p.y);dragFurniture=null;commit();});rc.addEventListener('pointercancel',()=>{dragFurniture=null;clearGesture();});rc.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();const msg=interact(state,'pet');petReaction('heart');say(msg);commit();}});}
  const walkDoor=$('#walkDoor'),walkShortcut=$('#walkShortcut');const startWalkFromHome=()=>{if(state.hunt?.running){toast('자동사냥에서 먼저 귀환해야 산책할 수 있어.');return;}if(state.battle?.running){toast('배틀을 마친 뒤 산책할 수 있어.');return;}walkDoor?.classList.add('opening');walkShortcut?.classList.add('is-pressed');actions.sfx?.('walk_start');setTimeout(()=>{walkDoor?.classList.remove('opening');walkShortcut?.classList.remove('is-pressed');if(!state.exploration.active){const r=startExploration(state,'walk');if(!r.ok){toast(r.msg);return;}}tab('explore');commit();},state.settings.motion?220:0);};if(walkDoor)walkDoor.onclick=startWalkFromHome;if(walkShortcut)walkShortcut.onclick=startWalkFromHome;
  const walkStart=$('#walkStart');if(walkStart)walkStart.onclick=()=>{const r=startExploration(state,'walk');if(r.ok)actions.sfx?.('walk_start');commit(r.msg);};
  const walkBack=$('#walkBack');if(walkBack)walkBack.onclick=()=>{if(state.exploration.active){const msg=cancelExploration(state,'산책을 그만하고 집으로 돌아왔어.');tab('home');toast(msg);actions.sfx?.('hunt_return');actions.save();}else tab('home');};
  $('#huntStart').onclick=()=>{if(!state.hunt.running&&!window.PetLife.busy(state))state.mainPetId=state.ui.huntPetId||state.mainPetId;const wasRunning=state.hunt.running,r=wasRunning?{ok:true,msg:stopHunt(state,'자동사냥을 마치고 귀환했다.')} : startHunt(state);if(r.ok)actions.sfx?.(wasRunning?'hunt_return':'hunt_start');commit(r.msg);};
  $$('[data-hunt-action]').forEach(b=>b.onclick=()=>{const type=b.dataset.huntAction,msg=huntIntervention(state,type);actions.sfx?.(type==='cheer'?'cheer':type==='snack'?'feed_crunch':type==='heal'?'heal':type==='rest'?'rest':'ok');commit(msg);});
  $('#huntReturn').onclick=()=>{actions.sfx?.('hunt_return');commit(stopHunt(state,'즉시 귀환했다.'));};
  $('#battleStart').onclick=()=>{if(!window.PetLife.busy(state))state.mainPetId=state.ui.battlePetId||state.mainPetId;const r=startBattle(state);if(r.ok)actions.sfx?.('battle_start');actions.logBattle(r.msg);commit(r.msg);};
  $('#addPet').onclick=()=>commit(actions.addPet());$('#jointTrain').onclick=()=>commit(actions.jointTrain());
  $('#seasonClaim').onclick=()=>{const r=claimSeason(state);commit(r.msg);};
  const modal=$('#settingsModal'),open=()=>{modal.classList.remove('hidden');requestAnimationFrame(()=>modal.classList.add('open'));renderSettings();},close=()=>{modal.classList.remove('open');setTimeout(()=>modal.classList.add('hidden'),state.settings.motion?180:0);};
  $('#settingsBtn').onclick=()=>{open();actions.sfx?.('open');};const homeSettings=$('#homeSettingsBtn');if(homeSettings)homeSettings.onclick=()=>{open();actions.sfx?.('open');};const menuSettings=$('#menuSettingsBtn');if(menuSettings)menuSettings.onclick=()=>{open();actions.sfx?.('open');};$('#settingsClose').onclick=()=>{close();actions.sfx?.('close');};$$('[data-close-settings]').forEach(x=>x.onclick=()=>{close();actions.sfx?.('close');});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!modal.classList.contains('hidden'))close();});
  $('#quality').onchange=e=>{state.settings.quality=e.target.value;document.body.dataset.quality=e.target.value;commit('그래픽 품질을 바꿨어.');};
  $('#musicToggle').onchange=e=>{state.settings.music=e.target.checked;actions.syncMusic?.();actions.save();};
  $('#sfxToggle').onchange=e=>{state.settings.sfx=e.target.checked;actions.save();if(e.target.checked)actions.sfx?.('ok');};
  $('#hapticsToggle').onchange=e=>{state.settings.haptics=e.target.checked;actions.save();if(e.target.checked)actions.haptic?.('tap');};
  $('#motionToggle').onchange=e=>{state.settings.motion=e.target.checked;document.body.classList.toggle('reduce-motion',!e.target.checked);actions.save();};
  $('#fullscreenBtn').onclick=async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await document.documentElement.requestFullscreen();renderSettings();actions.sfx?.('ok');}catch{toast('이 브라우저에서는 전체화면 전환을 사용할 수 없어.');actions.sfx?.('error');}};
  document.addEventListener('fullscreenchange',renderSettings);
  $('#resetBtn').onclick=()=>{if(confirm('게임 데이터를 처음 상태로 되돌릴까?'))actions.reset();};
 }
 renderOnboarding();bind();if(state.onboarding.done){tab(state.ui.tab||'home');renderAll();}
 return {renderAll,toast,say,showLoot};
}

// ===== main.js =====
console.info('[MathPet build]',BUILD_REV);

let state=loadState();window.PetLife.init(state);state.ui=state.ui||{};if(state.hunt?.running)stopHunt(state,'앱을 다시 열어 자동사냥에서 귀환했다.');if(state.battle?.running)cancelBattle(state,'앱을 다시 열어 진행 중이던 배틀을 정리했다.');if(state.exploration?.active&&!Number.isFinite(state.exploration.active.progressMs))state.exploration.active=null;if(state.exploration?.active?.kind==='walk')state.exploration.active=null;state.ui.tab='home';checkDailyReset(state);const offlineMessage=applyOffline(state);const audio=createAudio(state);let ui=null;
const actions={
 save(){saveState(state);},tap(){audio.sfx('squish');audio.haptic('tap');},sfx(name){audio.sfx(name);},haptic(kind){audio.haptic(kind);},syncMusic(){audio.syncMusic();},cue(msg){audio.cueForMessage(msg);},
 beginNewborn(){if(state.onboarding.done&&state.pets.some(p=>p.stage===0))return;const pet=createPet('kind','꼬물이');pet.stage=0;pet.starter='kind';pet.species='꼬물이';pet.name='꼬물이';pet.primary='미정';pet.secondary='미정';pet.personalityXP={};pet.growthPath=[0];pet.level=1;state.pets=[pet];state.mainPetId=pet.id;state.onboarding.done=true;state.onboarding.phase='life';state.ui.tab='home';addMemory(state,'알에서 꼬물이가 태어나 함께 지내기 시작했다.','first-meet',pet);saveState(state);},
 evolveNewborn(winner){const allowed=['brave','wise','kind','careful'];winner=allowed.includes(winner)?winner:'kind';const p=state.pets.find(x=>x.id===state.mainPetId)||state.pets[0];if(!p||p.stage!==0)return;const st=starters.find(x=>x.id===winner)||starters.find(x=>x.id==='kind');p.starter=st.id;p.lineage=st.id;p.species=st.species;p.name=st.name;p.stage=1;p.primary=st.primary;p.secondary=st.secondary;p.personalityXP={[st.primary]:6,[st.secondary]:3};p.growthPath=[0,'1:'+st.id];p.lastEvolutionEvent={id:`newborn-${Date.now()}`,stage:1,fromStage:0,form:'normal',reason:'꼬물이 시절 함께한 시간이 첫 모습을 만들었어.',at:Date.now()};state.codex.species=[...new Set([...state.codex.species,st.id])];state.codex.personalities=[...new Set([...state.codex.personalities,st.primary,st.secondary])];addMemory(state,`꼬물이가 ${st.species} ${st.name}(으)로 첫 진화했다.`,'evolution',p);saveState(state);},
 startFromFirstEvolution(winner,name){const pet=createPet(winner,name);state.pets=[pet];state.mainPetId=pet.id;state.onboarding.done=true;state.codex.species.push(pet.starter);state.codex.personalities.push(pet.primary,pet.secondary);addMemory(state,`${pet.name}와 처음 만났다.`,'first-meet');saveState(state);audio.sfx('reward');},
 addPet(){if(window.PetLife.busy(state))return '활동을 마치고 새 친구를 맞이하자.';if(state.pets.length>=2)return '두 마리와 함께 지내고 있어. 새 친구를 맞으려면 한 마리의 독립을 먼저 응원해 줘.';const meetCost=25;if(state.stars<meetCost)return `새 펫을 만나려면 별 ${meetCost}개가 필요해.`;state.stars-=meetCost;state.economy.totalSpent+=meetCost;const owned=new Set(state.pets.map(p=>p.starter));const choices=starters.filter(x=>['brave','careful','wise','kind'].includes(x.id));const s=choices.find(x=>!owned.has(x.id))||choices[Math.floor(Math.random()*choices.length)];const pet=createPet(s.id,`${s.name}${state.pets.length+1}`);pet.bond=45;state.pets.push(pet);state.codex.species.push(pet.starter);state.codex.species=[...new Set(state.codex.species)];addMemory(state,`별 ${meetCost}개를 사용해 새로운 펫 ${pet.name}을 가족으로 맞았다.`,'new-pet');saveState(state);return `${pet.name}이 새 가족이 됐어. · 별 ${meetCost}개 사용`;},
 jointTrain(){const r=jointTrain(state);saveState(state);return r.msg;},
 logBattle(msg){if(!msg)return;const el=document.getElementById('battleLog');if(el){const div=document.createElement('div');div.textContent=msg;el.prepend(div);while(el.children.length>18)el.lastElementChild.remove();}},
 reset(){clearState();location.reload();}
};
ui=createUI(state,actions);animateCanvases(state);if(offlineMessage)ui.toast(offlineMessage);
setInterval(()=>{if(!state.onboarding.done||state.ui.tab!=='home'||state.hunt?.running||state.battle?.running||state.exploration?.active)return;window.PetLife.tick(state);const msg=lifeTick(state);if(msg){const trouble=/망가뜨려|어질렀다|몰래 간식|조금 지쳤다/.test(msg);ui.say(msg);if(trouble){ui.toast(msg);audio.sfx('error');audio.haptic('tap');}}saveState(state);ui.renderAll();},5000);
let lastHuntActionId=null,lastBattleActionId=null;
setInterval(()=>{if(!state.onboarding.done||state.ui.tab!=='hunt'||!state.hunt?.running)return;const msg=huntTick(state);let handledAction=false;if(state.hunt.lastAction&&state.hunt.lastAction.id!==lastHuntActionId){handledAction=true;lastHuntActionId=state.hunt.lastAction.id;audio.sfx(state.hunt.lastAction.sfx||'hit');if(state.hunt.lastAction.kind==='loot'&&state.hunt.lastLoot)ui.showLoot?.(state.hunt.lastLoot);if(state.hunt.lastAction.voice)ui.say(window.PetLife.line(state.pets.find(p=>p.id===state.hunt.petId)||state.pets[0],state.hunt.lastAction.kind));}if(msg){const el=document.getElementById('huntLog');if(el){const d=document.createElement('div');d.textContent=msg;el.prepend(d);while(el.children.length>18)el.lastElementChild.remove();}if(!handledAction){if(/희귀/.test(msg))audio.sfx('rare');else if(/공격|피격/.test(msg))audio.sfx('hit');}saveState(state);ui.renderAll();}},300);
setInterval(()=>{if(!state.onboarding.done||state.ui.tab!=='battle'||!state.battle?.running)return;const msg=battleTick(state);let handledAction=false;if(state.battle.lastAction&&state.battle.lastAction.id!==lastBattleActionId){handledAction=true;lastBattleActionId=state.battle.lastAction.id;audio.sfx(state.battle.lastAction.sfx||'battle');if(state.battle.lastAction.voice)ui.say(window.PetLife.line(state.pets.find(p=>p.id===state.battle.petId)||state.pets[0],state.battle.lastAction.kind));}if(msg){actions.logBattle(msg);if(!handledAction){if(!state.battle.running)audio.sfx(state.battle.outcome==='victory'?'victory':'defeat');else if(/필살기|각성/.test(msg))audio.sfx(/각성/.test(msg)?'rare':'battle');else if(/피해|공격/.test(msg))audio.sfx('hit');}saveState(state);ui.renderAll();}},300);
let lastWalkTickAt=performance.now(),lastWalkEventCount=state.exploration?.active?.eventCount||0;setInterval(()=>{const now=performance.now(),delta=Math.min(1000,Math.max(0,now-lastWalkTickAt));lastWalkTickAt=now;if(!state.onboarding.done||document.hidden||state.ui.tab!=='explore'||state.exploration.active?.kind!=='walk')return;const r=walkTick(state,delta),a=state.exploration.active;if(a&&a.eventCount!==lastWalkEventCount){lastWalkEventCount=a.eventCount;audio.sfx(a.event?.gift?'walk_gift':a.event?.kind==='friend'?'walk_friend':'item');}if(r?.ok){ui.toast(r.msg);audio.sfx('walk_finish');audio.haptic('reward');state.ui.tab='home';saveState(state);ui.renderAll();return;}saveState(state);ui.renderAll();},500);
setInterval(()=>saveState(state),15000);window.addEventListener('beforeunload',()=>saveState(state));






