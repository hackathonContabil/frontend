export const getSuccessMessage = (message) => {
    return {
        success: true,
        message
    }
}

export const getErrorMessage = (error, defaultMessage) => {
    let message = defaultMessage

    if(error.data){
        message = error.data.message
    }
    
    return {
        success: false,
        message
    }
}