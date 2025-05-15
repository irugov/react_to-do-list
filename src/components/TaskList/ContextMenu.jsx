function ContextMenu({menuRef}) {
    return (
        <div
            ref={menuRef}
            className="flex flex-col items-start absolute right-[20px] top-0 bg-black border border-white rounded p-[10px] z-30000"
            onClick={(e) => e.stopPropagation()}
        >
            <button className="">Редактировать</button>
            <button>Удалить</button>
        </div>
    );
}

export default ContextMenu;