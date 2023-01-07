import { memo } from 'react';
import { Input } from 'antd';
const FilterColumnTableVacancy = ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => {
    return (
        <div className="p-2 shadow-lg">
            <Input
                className="border border-gray-800 hover:border-orange-500"
                autoFocus
                placeholder="Ingresar texto"
                value={selectedKeys[0]}
                onChange={e => {
                    setSelectedKeys(e.target.value ? [e.target.value] : []);
                }}
                onPressEnter={() => {
                    confirm();
                }}
                onBlur={() => {
                    confirm();
                }}
            ></Input>
            <div className="flex justify-between my-2">
                <div
                    onClick={() => {
                        confirm();
                    }}
                    className="bg-black hover:bg-gray-600 text-white font-bold py-2 px-4 rounded text-xs cursor-pointer select-none"
                >
                    Buscar
                </div>
                <div
                    onClick={() => {
                        clearFilters({ confirm: true });
                    }}
                    className=" bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow text-xs cursor-pointer select-none"
                >
                    Limpiar
                </div>
            </div>
        </div>
    );
};
export default memo(FilterColumnTableVacancy);
