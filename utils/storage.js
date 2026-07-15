/* 本地存储工具类 - 统一封装收藏、自测记录、字体大小、AI对话记录等 */

const KEY_COLLECT_RECIPES = 'collect_recipes'
const KEY_COLLECT_INGREDIENTS = 'collect_ingredients'
const KEY_SELF_TEST_RESULT = 'self_test_result'
const KEY_FONT_SIZE = 'font_size'
const KEY_AI_MESSAGES = 'ai_chat_messages'
const KEY_AI_COUNT = 'ai_chat_count'

export default {
    // 收藏食谱
    addRecipe(recipe) {
        const list = this.getRecipes()
        if (!list.find(item => item.id === recipe.id)) {
            list.unshift(recipe)
            uni.setStorageSync(KEY_COLLECT_RECIPES, list)
        }
    },
    removeRecipe(id) {
        const list = this.getRecipes().filter(item => item.id !== id)
        uni.setStorageSync(KEY_COLLECT_RECIPES, list)
    },
    getRecipes() {
        return uni.getStorageSync(KEY_COLLECT_RECIPES) || []
    },
    isRecipeCollected(id) {
        return this.getRecipes().some(item => item.id === id)
    },

    // 收藏食材
    addIngredient(ingredient) {
        const list = this.getIngredients()
        if (!list.find(item => item.id === ingredient.id)) {
            list.unshift(ingredient)
            uni.setStorageSync(KEY_COLLECT_INGREDIENTS, list)
        }
    },
    removeIngredient(id) {
        const list = this.getIngredients().filter(item => item.id !== id)
        uni.setStorageSync(KEY_COLLECT_INGREDIENTS, list)
    },
    getIngredients() {
        return uni.getStorageSync(KEY_COLLECT_INGREDIENTS) || []
    },
    isIngredientCollected(id) {
        return this.getIngredients().some(item => item.id === id)
    },

    // 自测结果
    setTestResult(result) {
        uni.setStorageSync(KEY_SELF_TEST_RESULT, result)
    },
    getTestResult() {
        return uni.getStorageSync(KEY_SELF_TEST_RESULT) || null
    },

    // 字体大小
    setFontSize(size) {
        uni.setStorageSync(KEY_FONT_SIZE, size)
    },
    getFontSize() {
        return uni.getStorageSync(KEY_FONT_SIZE) || 'medium'
    },

    // AI对话记录
    saveAIChatMessages(messages) {
        uni.setStorageSync(KEY_AI_MESSAGES, messages)
    },
    getAIChatMessages() {
        return uni.getStorageSync(KEY_AI_MESSAGES) || []
    },
    clearAIChat() {
        uni.removeStorageSync(KEY_AI_MESSAGES)
    },
    setAIChatCount(count) {
        uni.setStorageSync(KEY_AI_COUNT, count)
    },
    getAIChatCount() {
        return uni.getStorageSync(KEY_AI_COUNT) || 0
    },

    // 清空所有收藏
    clearAll() {
        uni.removeStorageSync(KEY_COLLECT_RECIPES)
        uni.removeStorageSync(KEY_COLLECT_INGREDIENTS)
        uni.removeStorageSync(KEY_SELF_TEST_RESULT)
        uni.removeStorageSync(KEY_AI_MESSAGES)
        uni.removeStorageSync(KEY_AI_COUNT)
    }
}