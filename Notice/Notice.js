(function (){// header menu
    document.body.addEventListener('click', menu_change)
    function menu_change(e){
        let menu_content_wrapper = document.getElementById('menu-content-wrapper')
        let display_value = window.getComputedStyle(menu_content_wrapper).getPropertyValue("display")
        function is_find_ancestor(elem, selector){
            while(elem){
                if(elem.matches(selector)){
                    return true // targetの内側
                }
                elem = elem.parentElement
            }
            return false // targetの外側
        }
        if(is_find_ancestor(e.target, ".menu-content-wrapper"))return
        let target = e.target.id  
        if(target === ""){
            target = target.parentElement
        }
        if(target === "menu-btn"){
            if(display_value === "none"){
                menu_content_wrapper.style.display = "block"
                return
            }
            if(display_value === "block"){
                menu_content_wrapper.style.display = "none"
                return
            }
        }
        if(display_value === "block"){
            menu_content_wrapper.style.display = "none"
        }
    }
}());
(function (){ // display mode change
    const mode_active_elem = [
        ".profile-name",
        ".profile-message",
        ".links-wrapper a",
        ".post-length",
        ".post-name",
        ".whisper-length",
        ".whisper-name",
        ".followers-length",
        ".followers-name",
        ".post-user h3",
        ".upload-date",
        ".post-setting-btn",
        ".message-wrapper p",
        ".whisper-name h3",
        ".whisper-date span",
        ".whisper-date svg",
        ".whisper-main-text"
    ]
    let display_mode_btn = document.getElementById('display-mode-btn')
    display_mode_btn.addEventListener('click', display_mode_change)
    function display_mode_change(){
        let text = display_mode_btn.textContent
        let header = document.querySelector("header")
        let body = document.querySelector("body")
        let footer = document.querySelector("footer")
        if(text === "dark"){// ⇒　mode light
            header.style.background = "#F5F5F5"
            body.style.background = "#F5F5F5"
            footer.style.background = "#F5F5F5"
            for(let i=0;i<mode_active_elem.length;i++){
                if(document.querySelectorAll(mode_active_elem[i]).length > 1){
                    document.querySelectorAll(mode_active_elem[i]).forEach(elem =>{
                        elem.style.color = "black"
                    })
                    continue
                }
                document.querySelector(mode_active_elem[i]).style.color = "black"
            }
            localStorage.setItem('display-mode', 'light')
            display_mode_btn.textContent = "light"
            return          
        }
        if(text === "light"){// ⇒　mode dark
            header.style.background = "#1B1B1B"
            body.style.background = "#1B1B1B"
            footer.style.background = "#1B1B1B"
            for(let i=0;i<mode_active_elem.length;i++){
                if(document.querySelectorAll(mode_active_elem[i]).length > 1){
                    document.querySelectorAll(mode_active_elem[i]).forEach(elem =>{
                        elem.style.color = "white"
                    })
                    continue
                }
                document.querySelector(mode_active_elem[i]).style.color = "white"
            }
            localStorage.setItem('display-mode', 'dark')
            display_mode_btn.textContent = "dark"
        }
    }
}());
(function (){ // language mode change
    let en_jp_mode_btn = document.getElementById('en-jp-mode-btn')
    en_jp_mode_btn.addEventListener('click', en_jp_mode_change)
    function en_jp_mode_change(){
        let text = en_jp_mode_btn.textContent
        if(text === "English"){
            localStorage.setItem('language', 'Japan') 
            en_jp_mode_btn.textContent = "Japan"
            language_mode_change()
            return 
        }
        if(text === "Japan"){
            localStorage.setItem('language', 'English')
            en_jp_mode_btn.textContent = "English"
            language_mode_change()
        }
    }
}());
(function (){  // Notice menu                 
    document.getElementById('Notice-menu-container').addEventListener('click', Notice_menu_change)
    function Notice_menu_change(e){
        let get_elem = e.target
        if(get_elem.id === "post-btn" || get_elem.id === "whisper-btn" || get_elem.id === "media-btn"){
            get_elem = get_elem.parentElement
        }
        let post_btn = document.getElementById('post-btn')
        let whisper_btn = document.getElementById('whisper-btn')
        let media_btn = document.getElementById('media-btn')

        let post_content_container = document.getElementById('post-content-container')
        let whisper_content_container = document.getElementById('whisper-content-container')
        let media_content_container = document.getElementById('media-content-container')
        if(get_elem.id === "post-btn-wrapper"){
            post_btn.style.borderBottom = "3px solid #469FFF"
            whisper_btn.style.borderBottom = "none"
            media_btn.style.borderBottom = "none"                

            post_content_container.style.display = "block"
            whisper_content_container.style.display = "none"
            media_content_container.style.display = "none"
            return
        }
        if(get_elem.id === "whisper-btn-wrapper"){
            post_btn.style.borderBottom = "none"
            whisper_btn.style.borderBottom = "3px solid #469FFF"
            media_btn.style.borderBottom = "none" 

            post_content_container.style.display = "none"
            whisper_content_container.style.display = "block"
            media_content_container.style.display = "none"
            return
        }
        if(get_elem.id === "media-btn-wrapper"){
            post_btn.style.borderBottom = "none"
            whisper_btn.style.borderBottom = "none"
            media_btn.style.borderBottom = "3px solid #469FFF" 

            post_content_container.style.display = "none"
            whisper_content_container.style.display = "none"
            media_content_container.style.display = "block"
        }
    }
}());
(function (){ // post数を計算してhtmlに表示させる
    let post_content_length = document.querySelectorAll('.post-content').length
    let post_length = document.querySelector('.post-length')
    post_length.textContent = post_content_length                                                          
}());
(function (){ // whisper数を計算してhtmlに表示させる
    async function read_json_whisper_length(json_file_path){
        const response = await fetch(json_file_path)
        const data = await response.json()
        let whisper_length = document.querySelector('.whisper-length')
        whisper_length.textContent = data.whisper.length
    }
    read_json_whisper_length("Notice_whisper_english.json")
}());

(function (){//localStorage reading
    let display_mode_btn = document.getElementById('display-mode-btn')
    let en_jp_mode_btn = document.getElementById('en-jp-mode-btn')
    if(localStorage.getItem('display-mode')){
        display_mode_btn.textContent = localStorage.getItem('display-mode')
    }else{
        localStorage.setItem('display-mode', 'dark')
        display_mode_btn.textContent = "dark"
    }
    if(localStorage.getItem('language')){
        en_jp_mode_btn.textContent = localStorage.getItem('language')
    }else{
        localStorage.setItem('language', 'English')
        en_jp_mode_btn.textContent = "English"
    }           
    language_mode_change()                  
}());

// localStorage.clear()

function language_mode_change(){
    let language_mode = localStorage.getItem('language')
    let whisper_content_container = document.getElementById('whisper-content-container')
    whisper_content_container.innerHTML = ""
    async function read_json_whisper(json_file_path){
        const response = await fetch(json_file_path)
        const data = await response.json()
        for(let i=0;i<data.whisper.length;i++){
            create_whisper(data.whisper[i])
        }
    }
    async function read_json_profile_message(json_file_path){
        const response = await fetch(json_file_path)
        const data = await response.json()
        document.querySelector('.profile-message').textContent = data.profile.message
    }
    function create_whisper(content){
        let content_text = content.text 
        let content_date = content.date 
        let links = content.links 
        let links_name = content.links_name
        let whisper_content = document.createElement('div')
            whisper_content.className = "whisper-content"
            whisper_content.id = "whisper-content"
        let comment_block = `
            <div class="whisper-header">
                <div class="whisper-header-2">
                    <div class="whisper-web-icon-wrapper">
                        <img src="/img/web-icon0003.png" class="web-icon">
                    </div>
                    <div class="whisper-name">
                        <h3>Notice WoW!!<span>@Somewhere in this world</span></h3>
                    </div>
                </div>
                <div class="whisper-date">
                    <span>${content_date}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><circle cx="256" cy="256" r="32" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/><circle cx="416" cy="256" r="32" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/><circle cx="96" cy="256" r="32" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/></svg>
                </div>
            </div>
            <div class="whisper-body">
                <p class="whisper-main-text">${content_text}</p>
            </div> `
        whisper_content.innerHTML = comment_block
        whisper_content_container.append(whisper_content)
        if(links.length===0)return
        let whisper_body = document.querySelector('.whisper-body')
        let div = document.createElement('div')
        div.className = "whisper-links-wrapper"
        for(let i=0;i<links.length;i++){
            let a = document.createElement('a')
            a.href = links[i]
            a.textContent = links_name[i]
            div.append(a)
        }
        whisper_body.append(div)
    }
    function font_color_update(){
        const whisper_font_color_update_elems = [".whisper-name h3",".whisper-date span", ".whisper-date svg", ".whisper-main-text"]
        if(localStorage.getItem('display-mode')){
            let mode = localStorage.getItem('display-mode')
            if(mode === "light"){
                for(let i=0;i<whisper_font_color_update_elems.length;i++){
                    if(document.querySelectorAll(whisper_font_color_update_elems[i]).length > 1){
                        document.querySelectorAll(whisper_font_color_update_elems[i]).forEach(elem =>{
                            elem.style.color = "black"
                        })
                        continue
                    }
                    document.querySelector(whisper_font_color_update_elems[i]).style.color = "black"
                }
            }
        }
    }
    if(language_mode === "English"){
        read_json_whisper("Notice_whisper_english.json")
        read_json_profile_message("Notice_whisper_english.json")
        font_color_update()
    }else if(language_mode === "Japan"){
        read_json_whisper("Notice_whisper_japan.json")
        read_json_profile_message("Notice_whisper_japan.json")
        font_color_update()
    }
}

console.log(localStorage.getItem('display-mode'))