/* 首页轮播图与入口数据 */

module.exports = {
    banners: [
        {
            id: 1,
            title: '春季养肝',
            subtitle: '万物复苏，疏肝解郁正当时',
            img: 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=800&h=400&fit=crop',
            season: 'spring'
        },
        {
            id: 2,
            title: '夏季清热',
            subtitle: '消暑利水，清淡饮食护身心',
            img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=400&fit=crop',
            season: 'summer'
        },
        {
            id: 3,
            title: '秋冬滋补',
            subtitle: '养阴润肺，温补脾肾好时节',
            img: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&h=400&fit=crop',
            season: 'autumn'
        }
    ],
    quickEntries: [
        { id: 'spring', name: '春', icon: '🌱', color: '#8FBC8F', desc: '养肝' },
        { id: 'summer', name: '夏', icon: '☀️', color: '#D2691E', desc: '清热' },
        { id: 'autumn', name: '秋', icon: '🍂', color: '#B8860B', desc: '润肺' },
        { id: 'winter', name: '冬', icon: '❄️', color: '#5F9EA0', desc: '温补' }
    ]
}