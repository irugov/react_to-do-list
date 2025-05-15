import TaskItem from './TaskItem';

function TaskSection({toggleVisibility, sectionsVisibility, title, tasks }) {
    return (
        <section>
                <div className="flex items-center gap-[7.5px] pl-[20px] h-[40px] cursor-pointer" onClick={ toggleVisibility}>
                    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="8px" height="8px" viewBox="-4.5 0 20 20" version="1.1">
                        <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                            <g id="Dribbble-Light-Preview" transform="translate(-305.000000, -6679.000000)" fill="#535358">
                                <g id="icons" transform="translate(56.000000, 160.000000)">
                                    <path d="M249.365851,6538.70769 L249.365851,6538.70769 C249.770764,6539.09744 250.426289,6539.09744 250.830166,6538.70769 L259.393407,6530.44413 C260.202198,6529.66364 260.202198,6528.39747 259.393407,6527.61699 L250.768031,6519.29246 C250.367261,6518.90671 249.720021,6518.90172 249.314072,6519.28247 L249.314072,6519.28247 C248.899839,6519.67121 248.894661,6520.31179 249.302681,6520.70653 L257.196934,6528.32352 C257.601847,6528.71426 257.601847,6529.34685 257.196934,6529.73759 L249.365851,6537.29462 C248.960938,6537.68437 248.960938,6538.31795 249.365851,6538.70769" 
                                    id="arrow_right-[#336]"
                                    {...( !sectionsVisibility ? {transform: "translate(254.000000, 6529.000000) rotate(90) translate(-254.000000, -6529.000000)"} : {} )}></path>
                                </g>
                            </g>
                        </g>
                    </svg>
                    <h2 className="text-[12px] font-bold">{ title }</h2>
                    <p className="text-[#535358]">{ tasks.length }</p>
                </div>
                {!sectionsVisibility && (
                  <ul className="[&_li:last-child_.borderline]:hidden">
                    { tasks.map(task => (
                        <TaskItem 
                            key={task.id}
                            {...task}
                        /> 
                      ))
                    }
                  </ul>
                )}
              
        </section>
    );
}

export default TaskSection;

