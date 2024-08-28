import { GuestStatus } from "@/constants/Guest";
import { IParty } from "@/interfaces/party.interface";

export const parties: IParty[] = [
   {
      id: '1',
      ownerId: '1',
      name: 'Churrasco do Fim de Semana',
      date: '2021-12-12',
      description: 'Description 1',
      address: {
         id: '1',
         zipCode: '00000-000',
         street: 'Rua dos Bobos',
         number: '0',
         city: 'São Paulo',
         state: 'SP',
         country: 'Brazil',
         lat: '-23.5505199',
         lng: '-46.6333094',
      },
      additionalInfo: [
         { id: 'new', name: '', value: 0, createdAt: '' },
         { id: '1', name: 'Chácara', value: 2000, createdAt: '2021-12-12' },
         { id: '2', name: 'Carne', value: 800, createdAt: '2021-12-12' },
         { id: '3', name: 'Bebida', value: 500, createdAt: '2021-12-12' },
         { id: '4', name: 'Carvão', value: 50, createdAt: '2021-12-12' },
         { id: '5', name: 'Outros', value: 150, createdAt: '2021-12-12' },
      ],
      guests: [
         {
            user: {
               id: '1',
               username: 'Joãozinho',
               email: 'teste@teste.com',
               file: { url: 'https://randomuser.me/api/portraits/men/33.jpg' },
            },
            status: GuestStatus.Accepted,
         },
         {
            user: {
               id: '2',
               username: 'Mariazinha',
               email: 'teste@teste.com',
               file: { url: 'https://randomuser.me/api/portraits/women/33.jpg' },
            },
            status: GuestStatus.Pending,
         },
         {
            user: {
               id: '3',
               username: 'Zezinho',
               email: 'teste@teste.com',
               file: { url: 'https://randomuser.me/api/portraits/men/34.jpg' },
            },
            status: GuestStatus.Declined,
         },
      ]
   },
   {
      id: '2',
      ownerId: '1',
      name: 'Aniversário do Joãozinho',
      date: '2021-12-12',
      description: 'Description 2',
      address: {
         id: '2',
         zipCode: '00000-000',
         street: 'Rua dos Queros-Queros',
         number: '1',
         city: 'Fernandopolis',
         state: 'SP',
         country: 'Brazil',
         lat: '-20.264911445322404',
         lng: '-50.24386374976725',
      },
      additionalInfo: [
         { id: 'new', name: '', value: 0, createdAt: '' },
         { id: '1', name: 'Bolo', value: 100, createdAt: '2021-12-12' },
         { id: '2', name: 'Salgadinho', value: 50, createdAt: '2021-12-12' },
         { id: '3', name: 'Bebida', value: 50, createdAt: '2021-12-12' },
         { id: '4', name: 'Decoração', value: 50, createdAt: '2021-12-12' },
         { id: '5', name: 'Outros', value: 50, createdAt: '2021-12-12' },
      ],
      guests: [
         {
            user: {
               id: '1',
               username: 'Joãozinho',
               email: 'teste@teste.com',
               file: { url: 'https://randomuser.me/api/portraits/men/33.jpg' },
            },
            status: GuestStatus.Accepted,
         },
         {
            user: {
               id: '2',
               username: 'Mariazinha',
               email: 'teste@teste.com',
               file: { url: 'https://randomuser.me/api/portraits/women/33.jpg' },
            },
            status: GuestStatus.Pending,
         },
         {
            user: {
               id: '3',
               username: 'Zezinho',
               email: 'teste@teste.com',
               file: { url: 'https://randomuser.me/api/portraits/men/34.jpg' },
            },
            status: GuestStatus.Declined,
         },
      ]
   },
   {
      id: '3',
      ownerId: '1',
      name: 'Party 3',
      date: '2021-12-12',
      description: 'Description 3',
      address: {
         id: '3',
         zipCode: '00000-000',
         street: 'Rua dos Bobos',
         number: '0',
         city: 'São Paulo',
         state: 'SP',
         country: 'Brazil',
         lat: '-23.5505199',
         lng: '-46.6333094',
      }
   },
   {
      id: '4',
      ownerId: '1',
      name: 'Party 4',
      date: '2021-12-12',
      description: 'Description 4',
      address: {
         id: '3',
         zipCode: '00000-000',
         street: 'Rua dos Bobos',
         number: '0',
         city: 'São Paulo',
         state: 'SP',
         country: 'Brazil',
         lat: '-23.5505199',
         lng: '-46.6333094',
      }
   },
   {
      id: '5',
      ownerId: '1',
      name: 'Party 5',
      date: '2021-12-12',
      description: 'Description 5',
      address: {
         id: '3',
         zipCode: '00000-000',
         street: 'Rua dos Bobos',
         number: '0',
         city: 'São Paulo',
         state: 'SP',
         country: 'Brazil',
         lat: '-23.5505199',
         lng: '-46.6333094',
      }
   },
   {
      id: '6',
      ownerId: '1',
      name: 'Aniversário do José',
      date: '2021-12-12',
      description: 'Description 6',
      address: {
         id: '3',
         zipCode: '00000-000',
         street: 'Rua dos Bobos',
         number: '0',
         city: 'São Paulo',
         state: 'SP',
         country: 'Brazil',
         lat: '-23.5505199',
         lng: '-46.6333094',
      },
      additionalInfo: [
         { id: 'new', name: '', value: 0, createdAt: '' },
         { id: '1', name: 'Sushi', value: 1200, createdAt: '2021-12-12' },
         { id: '2', name: 'Salgadinho', value: 200, createdAt: '2021-12-12' },
         { id: '3', name: 'Bebida', value: 350, createdAt: '2021-12-12' },
         { id: '4', name: 'Outros', value: 50, createdAt: '2021-12-12' },
      ],
      guests: [
         {
            user: {
               id: '1',
               username: 'Joãozinho',
               email: 'teste@teste.com',
               file: { url: 'https://randomuser.me/api/portraits/men/33.jpg' },
            },
            status: GuestStatus.Accepted,
         },
         {
            user: {
               id: '2',
               username: 'Mariazinha',
               email: 'teste@teste.com',
               file: { url: 'https://randomuser.me/api/portraits/women/33.jpg' },
            },
            status: GuestStatus.Pending,
         },
         {
            user: {
               id: '3',
               username: 'Zezinho',
               email: 'teste@teste.com',
               file: { url: 'https://randomuser.me/api/portraits/men/34.jpg' },
            },
            status: GuestStatus.Declined,
         },
      ]
   },
]