import axiosInstance from './axiosInstance'

const axiosService = async (method, url, data = null) => {

    try {

        const response = await axiosInstance({
            method: method,
            url: url,
            data: data
        })

        return response

    } catch (error) {

        console.log(error)

        throw error
    }
}

export default axiosService