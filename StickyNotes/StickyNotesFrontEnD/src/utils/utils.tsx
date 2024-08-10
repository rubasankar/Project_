import ApiService from "../ApiService";

export const saveData = async (unid: string, key: string, value: string|object) => {
    const payload = { [key]: value };
    try {
        ApiService.patch(`/notes/update/${unid}/`, payload)
    } catch (error) {
        console.error(error);
    }
};
