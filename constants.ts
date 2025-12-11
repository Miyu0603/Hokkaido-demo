import { DaySchedule, ChecklistItem } from './types';

export const APP_CONFIG = {
  GAS_API_URL: '', // User to fill this in if they deploy a script
  WEATHER_API: 'https://api.open-meteo.com/v1/forecast?latitude=43.0618&longitude=141.3545&current_weather=true',
};

export const INITIAL_CHECKLIST_PREP: ChecklistItem[] = [
  { id: 'p1', text: '護照 (檢查效期)', isChecked: false, category: 'general' },
  { id: 'p2', text: 'Visit Japan Web 登錄', isChecked: false, category: 'general' },
  { id: 'p3', text: '日幣換匯', isChecked: false, category: 'general' },
  { id: 'p4', text: '購買旅遊保險', isChecked: false, category: 'general' },
  { id: 'p5', text: 'eSIM /漫遊開通', isChecked: false, category: 'general' },
  { id: 'p6', text: '信用卡 (確認海外回饋)', isChecked: false, category: 'general' },
];

export const INITIAL_CHECKLIST_LUGGAGE: ChecklistItem[] = [
  { id: 'l1', text: '行動電源 (不可托運)', isChecked: false, category: 'carry-on' },
  { id: 'l2', text: '鋰電池 (相機/GoPro)', isChecked: false, category: 'carry-on' },
  { id: 'l3', text: '護照 & 錢包', isChecked: false, category: 'carry-on' },
  { id: 'l4', text: '保暖外套 (羽絨)', isChecked: false, category: 'checked' },
  { id: 'l5', text: '發熱衣 x 4', isChecked: false, category: 'checked' },
  { id: 'l6', text: '防滑雪靴', isChecked: false, category: 'checked' },
  { id: 'l7', text: '個人藥品', isChecked: false, category: 'checked' },
  { id: 'l8', text: '牙刷牙膏', isChecked: false, category: 'checked' },
  { id: 'l9', text: '萬用轉接頭', isChecked: false, category: 'checked' },
];

export const ITINERARY_DATA: DaySchedule[] = [
  {
    id: 'day1',
    dateStr: '12/17 (三)',
    dayLabel: 'Day 1',
    items: [
      {
        id: 'd1-1',
        time: '09:20',
        title: '桃園起飛 (JX850)',
        type: 'transport',
        detail: {
            name: '星宇航空 JX850',
            description: 'TPE -> CTS (新千歲)',
            mapUrl: 'https://goo.gl/maps/xyz'
        }
      },
      {
        id: 'd1-2',
        time: '14:05',
        title: '抵達新千歲機場',
        type: 'transport',
      },
      {
        id: 'd1-3',
        time: '15:30',
        title: '北海道神宮',
        type: 'activity',
        detail: {
          name: '北海道神宮',
          description: '參拜行程。雪季需注意行走安全。',
          address: '札幌市中央區宮丘474',
          mapCode: '9 487 340*36',
          phone: '011-611-0261',
          mapUrl: 'https://goo.gl/maps/hokkaido-jingu'
        }
      },
      {
        id: 'd1-4',
        time: '17:00',
        title: '札幌市區 (時計台/舊道廳)',
        type: 'activity',
        detail: {
            name: '札幌市鐘樓 (時計台)',
            description: '日本現存最古老的鐘樓。途經舊道廳。',
            address: '札幌市中央區北1條西2丁目',
            mapCode: '9 522 847*28',
            mapUrl: 'https://goo.gl/maps/clock-tower'
        }
      },
      {
        id: 'd1-5',
        time: '18:30',
        title: '大通公園 & 白色燈樹節',
        type: 'activity',
        isHighlight: true,
        detail: {
          name: '札幌白色燈樹節',
          description: '欣賞美麗的夜景燈飾。自由活動。',
          mapUrl: 'https://goo.gl/maps/odori-park'
        }
      },
      {
        id: 'd1-6',
        time: '19:30',
        title: '晚餐：螃蟹和牛吃到飽',
        type: 'food',
        detail: {
            name: '難陀 (Nanda) 或類似',
            description: '海鮮自助餐，三大蟹吃到飽。',
            mapUrl: 'https://goo.gl/maps/nanda'
        }
      },
      {
        id: 'd1-7',
        time: '21:00',
        title: '入住：札幌 Tsubaki 飯店',
        type: 'hotel',
        detail: {
            name: 'Premier Hotel -TSUBAKI- Sapporo',
            description: '享受舒適的住宿環境。',
            address: '札幌市豊平區豊平4條1丁目1-1',
            phone: '011-821-1111',
            mapCode: '9 494 286*66',
            mapUrl: 'https://goo.gl/maps/tsubaki'
        }
      }
    ]
  },
  {
    id: 'day2',
    dateStr: '12/18 (四)',
    dayLabel: 'Day 2',
    items: [
      { id: 'd2-1', time: '09:00', title: '免稅店購物', type: 'shopping' },
      {
        id: 'd2-2',
        time: '11:00',
        title: '小樽運河散策',
        type: 'activity',
        isHighlight: true,
        detail: {
            name: '小樽運河',
            description: '漫步運河畔，感受懷舊氛圍。',
            mapCode: '493 690 412*44',
            mapUrl: 'https://goo.gl/maps/otaru-canal'
        }
      },
      {
        id: 'd2-3',
        time: '13:00',
        title: '堺町通 (北一硝子/六花亭)',
        type: 'activity',
        detail: {
            name: '小樽堺町通商店街',
            description: '北一硝子館、音樂盒堂、北菓樓、六花亭、銀之鐘咖啡(含杯)。',
            mapUrl: 'https://goo.gl/maps/sakaimachi'
        }
      },
      { id: 'd2-4', time: '16:30', title: '小樽雪物語 / 聖誕燈飾', type: 'activity' },
      { id: 'd2-5', time: '18:00', title: '移動前往層雲峽', type: 'transport' },
      {
        id: 'd2-6',
        time: '20:00',
        title: '入住：層雲峽溫泉飯店',
        type: 'hotel',
        detail: {
            name: '層雲峽溫泉 朝陽亭 (範例)',
            description: '享受溫泉與自助晚餐',
            address: '上川郡上川町層雲峽溫泉',
            mapCode: '623 204 653*44',
            mapUrl: 'https://goo.gl/maps/sounkyo'
        }
      }
    ]
  },
  {
    id: 'day3',
    dateStr: '12/19 (五)',
    dayLabel: 'Day 3',
    items: [
      { id: 'd3-1', time: '09:00', title: '銀河、流星瀑布', type: 'activity' },
      {
        id: 'd3-2',
        time: '11:00',
        title: '北見狐狸村',
        type: 'activity',
        detail: {
            name: '北見狐狸村',
            description: '近距離觀察狐狸 (請勿觸摸)。',
            mapUrl: 'https://goo.gl/maps/fox-village'
        }
      },
      { id: 'd3-3', time: '13:00', title: '網走監獄 / 流冰館', type: 'activity' },
      { id: 'd3-4', time: '15:30', title: '摩周湖 / 阿寒湖溫泉街', type: 'activity' },
      {
        id: 'd3-5',
        time: '16:30',
        title: '雪上活動三合一',
        type: 'activity',
        isHighlight: true,
        detail: {
            name: '阿寒湖冰上樂園',
            description: '香蕉船、四輪越野車、雪上摩托車。若雪況不佳退費¥2000。',
            mapUrl: 'https://goo.gl/maps/akan'
        }
      },
      {
        id: 'd3-6',
        time: '18:00',
        title: '入住：阿寒鶴雅',
        type: 'hotel',
        detail: {
            name: '阿寒遊久之里 鶴雅',
            description: '知名的溫泉旅館，享受露天風呂。',
            address: '釧路市阿寒町阿寒湖溫泉4丁目6-10',
            phone: '0154-67-4000',
            mapUrl: 'https://goo.gl/maps/tsuruga'
        }
      }
    ]
  },
  {
    id: 'day4',
    dateStr: '12/20 (六)',
    dayLabel: 'Day 4',
    items: [
      { id: 'd4-1', time: '09:00', title: '釧路濕原 / 丹頂鶴公園', type: 'activity' },
      { id: 'd4-2', time: '12:00', title: '前往星野度假村', type: 'transport' },
      {
        id: 'd4-3',
        time: '14:00',
        title: '水之教堂 / 微笑海灘',
        type: 'activity',
        isHighlight: true,
        detail: {
            name: '星野 TOMAMU 度假村',
            description: '安藤忠雄水之教堂參觀，室內造浪池，木林之湯。',
            address: '勇払郡占冠村中トマム',
            phone: '0167-58-1111',
            mapCode: '608 511 304*44',
            mapUrl: 'https://goo.gl/maps/tomamu'
        }
      },
      { id: 'd4-4', time: '19:00', title: '愛絲冰城 ICE VILLAGE', type: 'activity', isHighlight: true },
      { id: 'd4-5', time: '20:00', title: '入住：星野 TOMAMU', type: 'hotel' }
    ]
  },
  {
    id: 'day5',
    dateStr: '12/21 (日)',
    dayLabel: 'Day 5',
    items: [
      {
        id: 'd5-1',
        time: '08:00',
        title: '霧冰平台 (纜車)',
        type: 'activity',
        detail: {
            name: '霧冰平台',
            description: '欣賞日高山脈與霧冰 (視氣候運營)。',
            mapUrl: 'https://goo.gl/maps/terrace'
        }
      },
      { id: 'd5-2', time: '11:00', title: '三井 Outlet 購物', type: 'shopping' },
      { id: 'd5-3', time: '13:00', title: '前往新千歲機場', type: 'transport' },
      { id: 'd5-4', time: '15:20', title: '千歲起飛 (JX851)', type: 'transport' },
      { id: 'd5-5', time: '19:05', title: '抵達桃園', type: 'transport' }
    ]
  }
];