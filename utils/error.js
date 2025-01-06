export function ServerError(code, message) {
    return {
        type: "server",
        code,
        message
    };
}

export function DatabaseError(error) {
    return {
        type: "database",
        error
    };
}
