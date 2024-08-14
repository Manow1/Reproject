// function showPopup(message) {
//     const popup = document.createElement('div');
//     popup.style.position = 'fixed';
//     popup.style.left = '50%';
//     popup.style.top = '50%';
//     popup.style.transform = 'translate(-50%, -50%)';
//     popup.style.backgroundColor = '#fff';
//     popup.style.padding = '20px';
//     popup.style.boxShadow = '0 0 10px rgba(0,0,0,0.1)';
//     popup.style.borderRadius = '5px';
//     popup.style.zIndex = '1000';

//     const messageElement = document.createElement('p');
//     messageElement.textContent = message;
//     popup.appendChild(messageElement);

//     const closeBtn = document.createElement('button');
//     closeBtn.textContent = 'Close';
//     closeBtn.style.marginTop = '10px';
//     closeBtn.style.padding = '10px';
//     closeBtn.style.backgroundColor = '#dc3545';
//     closeBtn.style.color = '#fff';
//     closeBtn.style.border = 'none';
//     closeBtn.style.borderRadius = '3px';
//     closeBtn.style.cursor = 'pointer';
//     closeBtn.onclick = () => document.body.removeChild(popup);
//     closeBtn.onmouseover = () => closeBtn.style.backgroundColor = '#c82333';
//     closeBtn.onmouseout = () => closeBtn.style.backgroundColor = '#dc3545';
//     popup.appendChild(closeBtn);

//     document.body.appendChild(popup);
// }