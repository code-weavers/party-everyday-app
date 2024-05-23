import { IUser } from "@/interfaces/user.interface";

export const user: IUser = {
   id: 'd5c161ff-aa12-448a-86e4-479b92f72192',
   username: 'John Doe',
   email: 'teste@teste.com',
   phoneNumber: '1234567890',
   file: { url: 'https://img.odcdn.com.br/wp-content/uploads/2021/05/Dragon-Ball-Goku-Moro-00-896x504-1.jpg' },
   bankInfo: {
      key: '123456',
   }
}

export const users: IUser[] = [
   { id: '1', username: 'John Doe', email: 'teste@teste.com', file: { url: 'https://img.odcdn.com.br/wp-content/uploads/2021/05/Dragon-Ball-Goku-Moro-00-896x504-1.jpg' } },
   { id: '2', username: 'Jane Doe', email: 'teste@teste.com', file: { url: 'https://img.odcdn.com.br/wp-content/uploads/2021/05/Dragon-Ball-Goku-Moro-00-896x504-1.jpg' } },
   { id: '3', username: 'John Smith', email: 'teste@teste.com', file: { url: 'https://img.odcdn.com.br/wp-content/uploads/2021/05/Dragon-Ball-Goku-Moro-00-896x504-1.jpg' } },
   { id: '4', username: 'Jane Smith', email: 'teste@teste.com', file: { url: 'https://img.odcdn.com.br/wp-content/uploads/2021/05/Dragon-Ball-Goku-Moro-00-896x504-1.jpg' } },
   { id: '5', username: 'John Johnson', email: 'teste@teste.com', file: { url: 'https://img.odcdn.com.br/wp-content/uploads/2021/05/Dragon-Ball-Goku-Moro-00-896x504-1.jpg' } },
   { id: '6', username: 'Jane Johnson', email: 'teste@teste.com', file: { url: 'https://img.odcdn.com.br/wp-content/uploads/2021/05/Dragon-Ball-Goku-Moro-00-896x504-1.jpg' } },
]