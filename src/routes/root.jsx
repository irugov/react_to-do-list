import { Link } from 'react-router-dom';

function Root() {
  
    return (
      <>
        <aside>
            <nav>
                <Link to={`/`}>Главная</Link>
                <Link to={`/about`}>О проекте</Link>
            </nav>
        </aside>
        <main class="flex flex-col h-screen text-white">
          <header class="sticky top-0 z-50 px-[20px] py-[15px] bg-[#1c1c1c]">
            <div class="flex justify-between items-center mb-[20px]">
                  <div class="flex items-center gap-[5px]">
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="28px" height="28px" viewBox="0 0 32 32" fill="none">
                        <path stroke="#535358" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8h15M5 16h22M5 24h22M5 11l3-3-3-3"/>
                      </svg>
                    </span>
                    <p class="text-[20px] font-bold">Всe</p>
                  </div>
                  <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="28px" height="28px" viewBox="0 0 24 24" fill="none">
                      <path d="M5.47719 7.96225C5.1802 8.25099 5.17351 8.72582 5.46225 9.02281C5.75099 9.3198 6.22582 9.32649 6.52281 9.03775L5.47719 7.96225ZM9.6 5H10.35C10.35 4.69857 10.1695 4.42644 9.89188 4.30913C9.61422 4.19182 9.29331 4.25214 9.07719 4.46225L9.6 5ZM8.85 19C8.85 19.4142 9.18579 19.75 9.6 19.75C10.0142 19.75 10.35 19.4142 10.35 19H8.85ZM18.5228 16.0377C18.8198 15.749 18.8265 15.2742 18.5377 14.9772C18.249 14.6802 17.7742 14.6735 17.4772 14.9623L18.5228 16.0377ZM14.4 19H13.65C13.65 19.3014 13.8305 19.5736 14.1081 19.6909C14.3858 19.8082 14.7067 19.7479 14.9228 19.5377L14.4 19ZM15.15 5C15.15 4.58579 14.8142 4.25 14.4 4.25C13.9858 4.25 13.65 4.58579 13.65 5H15.15ZM6.52281 9.03775L10.1228 5.53775L9.07719 4.46225L5.47719 7.96225L6.52281 9.03775ZM8.85 5V19H10.35V5H8.85ZM17.4772 14.9623L13.8772 18.4623L14.9228 19.5377L18.5228 16.0377L17.4772 14.9623ZM15.15 19V5H13.65V19H15.15Z" fill="#535358"/>
                    </svg>
                  </div>
            </div>
            <input class="flex flex-none rounded-[6px] bg-neutral-800 w-full px-[12px] py-[7px] mb-[20px] placeholder:text-neutral-600" placeholder='+ Добавить задачу в "Входящие"'/>
          </header>
          
          <section class="grow bg-[#1c1c1c]">  
            <section>
              <div class="">
                <span class="flex items-center gap-[7.5px] pl-[20px] cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="8px" height="8px" viewBox="-4.5 0 20 20" version="1.1">
                      <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                          <g id="Dribbble-Light-Preview" transform="translate(-305.000000, -6679.000000)" fill="#535358">
                              <g id="icons" transform="translate(56.000000, 160.000000)">
                                  <path d="M249.365851,6538.70769 L249.365851,6538.70769 C249.770764,6539.09744 250.426289,6539.09744 250.830166,6538.70769 L259.393407,6530.44413 C260.202198,6529.66364 260.202198,6528.39747 259.393407,6527.61699 L250.768031,6519.29246 C250.367261,6518.90671 249.720021,6518.90172 249.314072,6519.28247 L249.314072,6519.28247 C248.899839,6519.67121 248.894661,6520.31179 249.302681,6520.70653 L257.196934,6528.32352 C257.601847,6528.71426 257.601847,6529.34685 257.196934,6529.73759 L249.365851,6537.29462 C248.960938,6537.68437 248.960938,6538.31795 249.365851,6538.70769" id="arrow_right-[#336]"></path></g></g></g></svg>
                  <h2 class="text-[12px] font-bold">Активные</h2>
                  <p class="text-[#535358]">5</p>
                </span>
                <ul class="[&_li:last-child_div_div:last-child]:hidden">
                  <li class="relative group flex items-center px-[20px]">
                    <div class="absolute left-[10px] -translate-x-[50%] opacity-0 group-hover:opacity-100 text-[#535358] hover:text-white hover:cursor-move">
                      =
                    </div>
  
                    <div class="grow group-hover:bg-[#363636] group-hover:rounded-md">
                      <div class="flex items-center px-[14px]">
                          <input type="checkbox" class="peer appearance-none w-[18px] h-[18px] cursor-pointer border border-[#535358] rounded mr-[5px] hover:bg-[#535358] checked:bg-[#535358] checked:bg-no-repeat checked:bg-center" />
                          <p class="w-full p-[10px] peer-checked:line-through hover:border-none">
                            Default checkbox
                          </p>
                      </div>
                      <div class="border-t border-[#535358] group-hover:opacity-0"></div> 
                    </div> 
  
                    <div class="absolute right-[10px] -translate-x-[-50%] opacity-0 group-hover:opacity-100 text-[#535358] hover:text-white hover:cursor-pointer align-middle">
                      x
                    </div>
                  </li>
                  <li class="relative group flex items-center px-[20px]">
                    <div class="absolute left-[10px] -translate-x-[50%] opacity-0 group-hover:opacity-100 text-[#535358] hover:text-white hover:cursor-move">
                      =
                    </div>
  
                    <div class="grow group-hover:bg-[#363636] group-hover:rounded-md">
                      <div class="flex items-center px-[14px]">
                          <input type="checkbox" class="peer relative appearance-none w-[18px] h-[18px] border border-[#535358] rounded mr-[5px] checked:bg-[#535358]" />
                          <p class="w-full p-[10px] peer-checked:line-through hover:border-none">
                            Default checkbox
                          </p>
                      </div>
                      <div class="border-t border-[#535358] group-hover:opacity-0"></div> 
                    </div> 
  
                    <div class="absolute right-[10px] -translate-x-[-50%] opacity-0 group-hover:opacity-100 text-[#535358] hover:text-white hover:cursor-pointer align-middle">
                      x
                    </div>
                  </li>
                </ul>
              </div>
              
            </section>
  
            <p>1</p>
            <p>1</p>
            <p>1</p>
            <p>1</p><p>1</p>
            <p>1</p><p>1</p>
            <p>1</p><p>1</p>
            <p>1</p><p>1</p>
            <p>1</p><p>1</p>
            <p>1</p><p>1</p>
            <p>1</p><p>1</p>
            <p>1</p><p>1</p>
            <p>1</p><p>1</p>
            <p>1</p><p>1</p>
            <p>1</p><p>1</p>
            <p>1</p><p>1</p>
            <p>1</p><p>1</p>
            <p>1</p><p>1</p>
            <p>1</p><p>1</p>
            <p>1</p><p>1</p>
            <p>1</p><p>1</p>
            <p>1</p><p>1</p>
            <p>1</p><p>1</p>
            <p>1</p>
          </section>
  
         
        </main>
      </>
    )
  }
  
  export default Root;
  