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

    function renderUsersPagination(totalPages) {
      createSmartPagination(totalPages, currentUsersPage, 'usersPagination', (page) => {
        currentUsersPage = page;
        renderUsersList();
      });
    }

    function renderPagination(totalPages) {
      createSmartPagination(totalPages, currentPage, 'teamsPagination', (page) => {
        currentPage = page;
        renderTeams();
      });
    }`;

// Replace renderUsersPagination
const usersRe = /function renderUsersPagination\(totalPages\) \{[\s\S]*?paginationDiv\.appendChild\(btn\);\n\s*\}\n\s*\}/;
html = html.replace(usersRe, "/* SMART PAGINATION REPLACED HERE */");

// Replace renderPagination
const teamsRe = /function renderPagination\(totalPages\) \{[\s\S]*?paginationDiv\.appendChild\(btn\);\n\s*\}\n\s*\}/;
html = html.replace(teamsRe, smartPaginationCode);

// Remove the placeholder
html = html.replace("/* SMART PAGINATION REPLACED HERE */", "");

fs.writeFileSync('private/dashboard.html', html);
console.log('Done');
