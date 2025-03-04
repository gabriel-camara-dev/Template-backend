import { UserAlreadyExistsError } from "./user-already-exists-error";

export class UserWithSameEmailError extends UserAlreadyExistsError {
     constructor() {
          super('There is already an user with the same email.')
     }
}