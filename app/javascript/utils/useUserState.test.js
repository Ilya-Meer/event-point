const useUserState = require("./useUserState")
// @ponicode
describe("useUserState.default", () => {
    test("0", () => {
        let callFunction = () => {
            useUserState.default()
        }
    
        expect(callFunction).not.toThrow()
    })
})
