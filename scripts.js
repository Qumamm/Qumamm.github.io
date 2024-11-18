// 确保表单数据被正确处理和显示给用户
document.getElementById('contact').addEventListener('submit', function(event) {
    event.preventDefault(); // 阻止表单的默认提交行为

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    let formResponseMessage;

    if (nameInput.value.trim() === '') {
        formResponseMessage = '名字不能为空！';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
        formResponseMessage = '邮箱格式不正确！';
    } else if (messageInput.value.trim() === '') {
        formResponseMessage = '消息不能为空！';
    }

    // 如果表单验证通过
    if (!formResponseMessage) {
        const responseDiv = document.createElement('div');
        responseDiv.className = 'response-message';

        nameInput.insertAdjacentElement('afterend', responseDiv);

        responseDiv.textContent = `感谢您的联系! 我们将会尽快与您取得联系。`;

        // 清空输入框
        nameInput.value = '';
        emailInput.value = '';
        messageInput.value = '';
    } else {
        const responseDiv = document.createElement('div');
        responseDiv.className = 'response-message';
        responseDiv.textContent = formResponseMessage;

        this.insertAdjacentElement('afterend', responseDiv);
    }
});
