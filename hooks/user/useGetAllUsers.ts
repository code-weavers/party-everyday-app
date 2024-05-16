const usersMock = [
   { id: '1', name: 'John Doe', avatar: 'https://github.com/miguelgomes2p.png' },
   { id: '2', name: 'Jane Doe', avatar: 'https://github.com/miguelgomes2p.png' },
   { id: '3', name: 'John Smith', avatar: 'https://github.com/miguelgomes2p.png' },
   { id: '4', name: 'Jane Smith', avatar: 'https://github.com/miguelgomes2p.png' },
   { id: '5', name: 'John Johnson', avatar: 'https://github.com/miguelgomes2p.png' },
   { id: '6', name: 'Jane Johnson', avatar: 'https://github.com/miguelgomes2p.png' },
]

export const useGetAllUsers = () => {
   return { users: usersMock };
}