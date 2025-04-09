import { findUserById, updateUserPasswordInDB } from "../../repository/admin/user.password.reset.repository.js";
import { hashPassword } from "../../utils/password.util.js";


export const resetUserPasswordService = async(id, newPassword) => {
    const user = await findUserById(id);
    if (!user) throw new Error("User not found");

    const hashed = await hashPassword(newPassword);
    return await updateUserPasswordInDB(id, hashed);
};