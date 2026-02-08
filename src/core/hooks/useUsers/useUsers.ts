import { useQuery } from "@tanstack/react-query";

export const useUsers = (page: number, search: string) => {
  return useQuery({
    queryKey: ["users", page, search],
    queryFn: async () => {

    //   const res = await api.get("/users",{
    //     params:{page,search}
    //   });

    //   console.log(res);
      // Simulate API delay
      await new Promise(r => setTimeout(r, 500));

      const allUsers = [
        { id: 1, name: "Juan Dela Cruz", email: "juan@mail.com" },
        { id: 2, name: "Maria Santos", email: "maria@mail.com" },
        { id: 3, name: "Pedro Reyes", email: "pedro@mail.com" },
        { id: 4, name: "Ana Lopez", email: "ana@mail.com" },
        { id: 4, name: "Ana Lopez", email: "ana@mail.com" },
        { id: 4, name: "Ana Lopez", email: "ana@mail.com" },
        { id: 4, name: "Ana Lopez", email: "ana@mail.com" },
        { id: 4, name: "Ana Lopez", email: "ana@mail.com" },
        { id: 4, name: "Ana Lopez", email: "ana@mail.com" },
        { id: 4, name: "Ana Lopez", email: "ana@mail.com" },
        { id: 4, name: "Ana Lopez", email: "ana@mail.com" },
        { id: 4, name: "Ana Lopez", email: "ana@mail.com" },
        { id: 4, name: "Ana Lopez", email: "ana@mail.com" },
        { id: 4, name: "Ana Lopez", email: "ana@mail.com" },
      
    ];

      // Search filter
      const filtered = allUsers.filter(u =>
        u.name.toLowerCase().includes(search.toLowerCase())
      );

      // Pagination simulation
      const perPage = 10;
      const start = (page - 1) * perPage;

      return {
        data: filtered.slice(start, start + perPage),
        total: filtered.length,
        page,
        perPage,
      };
    }
  });
};
