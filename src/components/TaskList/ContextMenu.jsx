import { useTaskDataContext } from "../../contexts/TaskDataContext";
import { useTaskUiContext } from "../../contexts/TaskUiContext";

function ContextMenu({menuRef, id}) {
    const { deleteTask } = useTaskDataContext();
    const { setIsEditingId } = useTaskUiContext();

    return (
        <div
            ref={menuRef}
            className="flex flex-col items-center absolute right-[20px] top-0 bg-[#242424] border border-[#3d3d3d] rounded p-[10px] z-30000"
            onClick={(e) => e.stopPropagation()}
        >
            <button 
                className="w-full text-left p-[5px] hover:bg-[#3d3d3d] hover:rounded text-[#ffffffcc]"
                onClick={ () => setIsEditingId(id) }
            >
                    Редактировать
            </button>

            <button
                className="w-full text-left p-[5px] hover:bg-[#3d3d3d] hover:rounded text-[#ffffffcc]"
                onClick={ () => deleteTask(id)}>
                    Удалить
            </button>
        </div>
    );
}

export default ContextMenu;