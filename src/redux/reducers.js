// 定义如何修改状态
import { states } from './action'
export const reducers = (state = states, action) => {
    let {type} = action
    switch (type) {
        case 'home':
            return {
                ...state,
                home: action.filter
            }
        default:
            return state
    }
}
export default reducers