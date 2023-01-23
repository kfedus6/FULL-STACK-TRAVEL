
class ErrorApi extends Error {
    constructor(code, message) {
        super()
        this.code = code
        this.message = message
    }

    static badRequest(message) {
        //console.log(message)
        return new ErrorApi(200, { status: 400,message:message });
    }

    static internal(message) {
        console.log(message)
        return new ErrorApi(200, { status: 500,message });
    }

    static noAuth(message) {
        console.log(message)
        return new ErrorApi(200, { status: 401,mes:"you are not authorize or you are not admin" });
    }

    static forbidden(message) {
        console.log(message)
        return new ErrorApi(200, { status: 403,message })
    }

    static notFound(message) {
        console.log(message)
        return new ErrorApi(200, { status: 404,message })
    }
}

module.exports = ErrorApi