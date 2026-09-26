import { Calendar } from "lucide-react";

const FiltersPedidosTable = ({ startDate, setStartDate, endDate, setEndDate }: {
    startDate: string;
    setStartDate: (date: string) => void;
    endDate: string;
    setEndDate: (date: string) => void;
}) => {

    return (
        <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-[150px]">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar size={16} className="text-zinc-400 dark:text-zinc-500" />
                </div>
                <input
                    type="date"
                    className="block w-full pl-9 pr-2 py-2.5 bg-slate-100 dark:bg-zinc-800/50 border-none rounded-xl text-sm text-zinc-700 dark:text-zinc-200 focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-zinc-900 transition-all cursor-pointer dark:[color-scheme:dark]"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    title="Fecha desde"
                />
            </div>
            <span className="text-zinc-400 dark:text-zinc-500 text-sm font-medium">a</span>
            <div className="relative flex-1 md:w-[150px]">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar size={16} className="text-zinc-400 dark:text-zinc-500" />
                </div>
                <input
                    type="date"
                    className="block w-full pl-9 pr-2 py-2.5 bg-slate-100 dark:bg-zinc-800/50 border-none rounded-xl text-sm text-zinc-700 dark:text-zinc-200 focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-zinc-900 transition-all cursor-pointer dark:[color-scheme:dark]"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    title="Fecha hasta"
                />
            </div>
        </div>
    );
};

export default FiltersPedidosTable;
