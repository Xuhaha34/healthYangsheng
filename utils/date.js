/* 日期与节气工具类 */

const solarTerms = [
    { name: '小寒', month: 1, day: 5, tip: '天气寒冷，宜温补，多食羊肉、牛肉、生姜' },
    { name: '大寒', month: 1, day: 20, tip: '寒气最盛，注意保暖，推荐红枣桂圆粥' },
    { name: '立春', month: 2, day: 4, tip: '阳气初生，宜食春芽、韭菜，少食酸收之味' },
    { name: '雨水', month: 2, day: 19, tip: '气温回升，宜祛湿，推荐山药薏米粥' },
    { name: '惊蛰', month: 3, day: 5, tip: '万物复苏，宜清淡养肝，多食菠菜、芹菜' },
    { name: '春分', month: 3, day: 20, tip: '昼夜均分，调和阴阳，推荐香椿、豆芽' },
    { name: '清明', month: 4, day: 4, tip: '踏青时节，宜清热养肝，菊花枸杞茶为佳' },
    { name: '谷雨', month: 4, day: 20, tip: '雨多湿重，健脾祛湿，推荐赤小豆、茯苓' },
    { name: '立夏', month: 5, day: 5, tip: '夏季开始，养心安神，推荐莲子、百合' },
    { name: '小满', month: 5, day: 21, tip: '湿热渐盛，清热利湿，冬瓜、绿豆为宜' },
    { name: '芒种', month: 6, day: 5, tip: '天气炎热，清淡饮食，少食油腻辛辣' },
    { name: '夏至', month: 6, day: 21, tip: '暑热难耐，清热解暑，推荐绿豆汤、西瓜' },
    { name: '小暑', month: 7, day: 7, tip: '初伏将至，养心防暑，推荐苦瓜、丝瓜' },
    { name: '大暑', month: 7, day: 22, tip: '一年最热，清热祛湿，推荐荷叶粥、薏米' },
    { name: '立秋', month: 8, day: 7, tip: '秋高气爽，润肺防燥，推荐雪梨、银耳' },
    { name: '处暑', month: 8, day: 23, tip: '暑气渐消，滋阴润燥，推荐莲藕、蜂蜜' },
    { name: '白露', month: 9, day: 7, tip: '天气转凉，温补肺气，推荐山药、栗子' },
    { name: '秋分', month: 9, day: 23, tip: '昼夜等长，养阴润肺，推荐百合、麦冬' },
    { name: '寒露', month: 10, day: 8, tip: '秋意渐浓，驱寒保暖，推荐红枣、桂圆' },
    { name: '霜降', month: 10, day: 23, tip: '深秋寒凉，滋阴补肾，推荐板栗、柿子' },
    { name: '立冬', month: 11, day: 7, tip: '冬季开始，温补养生，推荐羊肉、萝卜' },
    { name: '小雪', month: 11, day: 22, tip: '气温下降，温热补益，推荐黑芝麻、核桃' },
    { name: '大雪', month: 12, day: 7, tip: '寒气渐重，补肾驱寒，推荐当归生姜羊肉汤' },
    { name: '冬至', month: 12, day: 22, tip: '阴极阳生，温补脾肾，推荐饺子、羊肉' }
]

// 根据月份获取当前季节
function getSeason(month) {
    if (month >= 3 && month <= 5) return 'spring'
    if (month >= 6 && month <= 8) return 'summer'
    if (month >= 9 && month <= 11) return 'autumn'
    return 'winter'
}

function getSeasonName(seasonKey) {
    const map = {
        spring: '春季',
        summer: '夏季',
        autumn: '秋季',
        winter: '冬季'
    }
    return map[seasonKey] || '春季'
}

// 获取当前节气信息
function getCurrentSolarTerm() {
    const now = new Date()
    const month = now.getMonth() + 1
    const day = now.getDate()

    let currentTerm = solarTerms[0]
    let minDiff = Infinity

    for (let i = 0; i < solarTerms.length; i++) {
        const term = solarTerms[i]
        let diff = 0
        if (term.month > month || (term.month === month && term.day >= day)) {
            diff = (term.month - month) * 30 + (term.day - day)
        } else {
            diff = (term.month + 12 - month) * 30 + (term.day - day)
        }
        if (diff >= 0 && diff < minDiff) {
            minDiff = diff
            currentTerm = term
        }
    }

    return {
        term: currentTerm,
        season: getSeason(month),
        seasonName: getSeasonName(getSeason(month)),
        date: `${month}月${day}日`
    }
}

// 获取当前日期字符串
function getTodayStr() {
    const now = new Date()
    return `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日`
}

// 根据季节获取对应的养生重点
function getSeasonTip(seasonKey) {
    const tips = {
        spring: '春季养肝为主，宜清淡饮食，多食绿色蔬菜',
        summer: '夏季清热养心，宜清淡利水，少食油腻',
        autumn: '秋季润肺养阴，宜润燥生津，多食白色食物',
        winter: '冬季温补养肾，宜温热补益，多食黑色食物'
    }
    return tips[seasonKey] || tips.spring
}

module.exports = {
    solarTerms,
    getSeason,
    getSeasonName,
    getCurrentSolarTerm,
    getTodayStr,
    getSeasonTip
}