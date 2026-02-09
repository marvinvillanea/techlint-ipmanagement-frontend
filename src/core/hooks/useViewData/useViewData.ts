import { useQuery, keepPreviousData } from "@tanstack/react-query";
import api from "../../api/axios";

type Column = {
  accessorKey: string;
  header: string;
};

// Ginawa nating "use" prefix para sumunod sa React Hook rules
export const useViewData = (
  page: number,
  search: string,
  tableView: string | undefined,
  column: Column[] = []
) => {
  return useQuery({
    // Mahalaga: Siguraduhing hindi undefined ang tableView sa key
    queryKey: ["viewData", tableView, page, search, column], 
    queryFn: async () => {
      // Dito natin malalaman sa console kung tumutuloy ang request
      console.log("Requesting API for table:", tableView);
      
      const res = await api.post(`/view/${tableView}`, { 
        page, 
        search, 
        column 
      });

       console.log("Requesting API for table RESPONSE:", res.data.data);
      return res.data;
    },
    // Hindi mag-re-request hangga't walang tableView
    enabled: !!tableView, 
    staleTime: 1000 * 60 * 5,
    // V5 syntax para sa keepPreviousData
    placeholderData: keepPreviousData, 
  });
};