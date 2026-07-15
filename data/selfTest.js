/* 体质自测题目与结果数据 */

module.exports = {
    questions: [
        {
            id: 1,
            question: '您平时手脚温度如何？',
            options: [
                { key: 'A', text: '手脚温热，不怕冷', type: 'heat' },
                { key: 'B', text: '手脚冰凉，怕冷明显', type: 'cold' },
                { key: 'C', text: '手脚正常，不冷不热', type: 'balance' },
                { key: 'D', text: '手心脚心发热，口干', type: 'yinxu' }
            ]
        },
        {
            id: 2,
            question: '您的面色通常是？',
            options: [
                { key: 'A', text: '面色红润有光泽', type: 'balance' },
                { key: 'B', text: '面色淡白或萎黄', type: 'qixu' },
                { key: 'C', text: '面色油光，易长痘', type: 'heat' },
                { key: 'D', text: '面色暗黄，有斑', type: 'xuese' }
            ]
        },
        {
            id: 3,
            question: '您平时食欲如何？',
            options: [
                { key: 'A', text: '食欲旺盛，消化好', type: 'balance' },
                { key: 'B', text: '食欲不振，饭后腹胀', type: 'qixu' },
                { key: 'C', text: '易饿但吃不多，口干', type: 'yinxu' },
                { key: 'D', text: '食欲正常但消化慢', type: 'cold' }
            ]
        },
        {
            id: 4,
            question: '您的睡眠质量？',
            options: [
                { key: 'A', text: '入睡快，睡眠深', type: 'balance' },
                { key: 'B', text: '入睡困难，多梦易醒', type: 'yinxu' },
                { key: 'C', text: '嗜睡，醒后仍困倦', type: 'qixu' },
                { key: 'D', text: '睡眠尚可，偶尔失眠', type: 'balance' }
            ]
        },
        {
            id: 5,
            question: '您平时情绪状态？',
            options: [
                { key: 'A', text: '情绪稳定，心态平和', type: 'balance' },
                { key: 'B', text: '容易烦躁易怒', type: 'heat' },
                { key: 'C', text: '容易情绪低落、抑郁', type: 'xuese' },
                { key: 'D', text: '容易焦虑紧张', type: 'yinxu' }
            ]
        }
    ],
    results: {
        balance: {
            name: '平和质',
            desc: '您体质平和，阴阳气血调和，是理想的健康状态。',
            color: '#6B8E4E',
            diet: '饮食均衡，不挑食，不过饥过饱，多吃时令蔬果，少吃油腻辛辣。',
            recommend: ['时令蔬菜', '五谷杂粮', '新鲜水果', '优质蛋白'],
            spring: '春季可食韭菜、香椿等时令菜，以助阳气升发',
            summer: '夏季清淡为主，绿豆、冬瓜清热消暑',
            autumn: '秋季宜食银耳、雪梨润燥养阴',
            winter: '冬季适当温补，羊肉、红枣补肾益精'
        },
        qixu: {
            name: '气虚质',
            desc: '您体质偏气虚，元气不足，容易疲劳、气短、易感冒。',
            color: '#C88B4A',
            diet: '宜食补气健脾的食物，如山药、红枣、小米、鸡肉；少吃生冷苦寒。',
            recommend: ['山药', '红枣', '小米', '鸡肉', '黄芪'],
            spring: '春季注意防风保暖，食山药粥、红枣粥健脾',
            summer: '夏季少贪凉，可吃莲子粥、茯苓饼益气',
            autumn: '秋季宜黄芪炖鸡、山药排骨汤补气',
            winter: '冬季当归生姜羊肉汤温补气血'
        },
        yinxu: {
            name: '阴虚质',
            desc: '您体质偏阴虚，阴液不足，常见口干、潮热、失眠。',
            color: '#8C4A31',
            diet: '宜食滋阴润燥的食物，如银耳、百合、梨、黑芝麻；少食辛辣温燥。',
            recommend: ['银耳', '百合', '雪梨', '黑芝麻', '莲子'],
            spring: '春季宜清淡养阴，食百合粥、银耳羹',
            summer: '夏季多食绿豆、冬瓜、莲子清心养阴',
            autumn: '秋季最宜养阴，银耳雪梨羹、百合莲子汤',
            winter: '冬季宜滋阴补肾，黑芝麻糊、核桃粥'
        },
        heat: {
            name: '湿热质',
            desc: '您体质偏湿热，体内有湿有热，易长痘、口干、烦躁。',
            color: '#D2691E',
            diet: '宜食清热利湿的食物，如绿豆、苦瓜、冬瓜；忌辛辣油腻和酒。',
            recommend: ['绿豆', '苦瓜', '冬瓜', '薏米', '莲子'],
            spring: '春季清淡饮食，多吃苦瓜、黄瓜',
            summer: '夏季多食绿豆汤、凉拌黄瓜清热利湿',
            autumn: '秋季可用茯苓、薏米煲汤祛湿',
            winter: '冬季不宜温补，以清淡素食为主'
        },
        cold: {
            name: '阳虚质',
            desc: '您体质偏阳虚，阳气不足，怕冷、手脚冰凉、喜热饮。',
            color: '#5F9EA0',
            diet: '宜食温补阳气的食物，如羊肉、生姜、核桃、韭菜；忌生冷寒凉。',
            recommend: ['羊肉', '生姜', '核桃', '韭菜', '红枣'],
            spring: '春季多食韭菜、香椿助阳升发',
            summer: '夏季不可贪凉，少生冷瓜果',
            autumn: '秋季开始进补，板栗烧鸡、山药排骨',
            winter: '冬季重点温补，当归生姜羊肉汤为首选'
        },
        xuese: {
            name: '气郁质',
            desc: '您体质偏气郁，情志不畅，易情绪低落、胸闷不舒。',
            color: '#886F5C',
            diet: '宜食理气解郁的食物，如玫瑰花、陈皮、白萝卜；多食以条畅情志。',
            recommend: ['玫瑰花', '陈皮', '白萝卜', '橙子', '山楂'],
            spring: '春季宜多外出踏青，食陈皮、玫瑰花茶理气',
            summer: '夏季清淡饮食，可喝荷叶茶疏肝',
            autumn: '秋季食白萝卜、柑橘行气解郁',
            winter: '冬季适当活动，食陈皮粥、山楂助消化'
        }
    }
}