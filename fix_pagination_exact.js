const fs = require('fs');
let html = fs.readFileSync('private/dashboard.html', 'utf8');

const smartPaginationCode = `    function createSmartPagination(totalPages, activePage, containerId, renderCallback) {
      const paginationDiv = document.getElementById(containerId);
      if (!paginationDiv) return;
      paginationDiv.innerHTML = '';
      if (totalPages <= 1) return;

      const addBtn = (pageNum, isEllipsis = false) => {
        const btn = document.createElement('button');
        btn.textContent = pageNum;
        if (isEllipsis) {
          btn.disabled = true;
          btn.style.cursor = 'default';
          btn.style.background = 'transparent';
          btn.style.border = 'none';
          btn.style.color = 'var(--text-muted)';
        } else {
          if (pageNum === activePage) btn.classList.add('active');
          btn.addEventListener('click', () => { renderCallback(pageNum); });
        }
        paginationDiv.appendChild(btn);
      };

      if (totalPages <= 7) {
        for (let i = 1; i <= totalPages; i++) addBtn(i);
      } else {
        if (activePage <= 4) {
          for (let i = 1; i <= 5; i++) addBtn(i);
          addBtn('...', true);
          addBtn(totalPages);
        } else if (activePage >= totalPages - 3) {
          addBtn(1);
          addBtn('...', true);
          for (let i = totalPages - 4; i <= totalPages; i++) addBtn(i);
        } else {
          addBtn(1);
          addBtn('...', true);
          addBtn(activePage - 1);
          addBtn(activePage);
          addBtn(activePage + 1);
          addBtn('...', true);
          addBtn(totalPages);
        }
      }
    }

    function renderPagination(totalPages) {
      createSmartPagination(totalPages, currentPage, 'teamsPagination', (page) => {
        currentPage = page;
        renderTeams();
      });
    }`;

// 1. Find and replace renderPagination
let start1 = html.indexOf('function renderPagination(totalPages) {');
if (start1 > -1) {
    let end1 = html.indexOf('  }', start1 + 45) + 3;
    html = html.substring(0, start1) + smartPaginationCode + html.substring(end1);
}

// 2. Find and replace renderUsersPagination
let start2 = html.indexOf('function renderUsersPagination(totalPages) {');
if (start2 > -1) {
    let end2 = html.indexOf('  }', start2 + 45) + 3;
    const newRenderUsers = `function renderUsersPagination(totalPages) {
      createSmartPagination(totalPages, currentUsersPage, 'usersPagination', (page) => {
        currentUsersPage = page;
        renderUsersList();
      });
    }`;
    html = html.substring(0, start2) + newRenderUsers + html.substring(end2);
}

fs.writeFileSync('private/dashboard.html', html);
console.log('Fixed exactly!');
