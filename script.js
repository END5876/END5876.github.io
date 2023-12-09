const inputBox = document.getElementById("input-box");
const deadlineInput = document.getElementById("deadline");
const listContainer = document.getElementById("list-container");

function addTask() {
    if (inputBox.value === '') {
        alert("You must write something!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;

        // 檢查是否有截止時間，如果有，則顯示
        const formattedDeadline = getFormattedDeadline();
        if (formattedDeadline !== null) {
            li.innerHTML += ' (Deadline: ' + formattedDeadline + ')';
            setReminder(inputBox.value, formattedDeadline);
        }

        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = "";
    deadlineInput.value = ""; // 清空截止日期輸入框
    saveData();
}

listContainer.addEventListener ("click", function(e) {
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
},false);

function saveData(){
    localStorage.setItem("data",listContainer.innerHTML);
}

function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
}
showTask();



function getFormattedDeadline() {
    // 格式化截止日期和時間
    if (deadlineInput.value) {
        const deadline = new Date(deadlineInput.value);
        const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        return deadline.toLocaleDateString('en-US', options);
    }
    return null;
}

function setReminder(task, deadline) {
    // 計算截止時間的毫秒數
    const deadlineTime = new Date(deadline).getTime();
    const currentTime = new Date().getTime();

    // 設置截止時間到達時的定時器
    const timeUntilDeadline = deadlineTime - currentTime;
    if (timeUntilDeadline > 0) {
        setTimeout(function () {
            // 顯示提醒通知
            showReminderNotification(task);
        }, timeUntilDeadline);
    }
}

function showReminderNotification(task) {
    // 檢查瀏覽器是否支持 Notification API
    if ('Notification' in window) {
        // 請求用戶許可顯示通知

                // 顯示提醒通知
                var notification = new Notification('Reminder', {
                    body: 'Task deadline reached: ' + task,
                });
            
        
    }
}