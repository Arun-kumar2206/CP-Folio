//-------------------------------------------------
//-------------------------------------------------
// Get config, set title/branding/footer, and apply accent colors
const isInPages = window.location.pathname.includes('/pages/');
const CONFIG_URL = isInPages ? '../data/config.json' : './data/config.json';

fetch(CONFIG_URL)
    .then(res => res.json())
    .then(config => {
        const baseName = config.name || "CP-Folio";
        const pageTitle = document.body?.dataset?.pageTitle || "CP-Folio";
        document.title = `${pageTitle} | ${baseName}`;

        const footer = document.getElementById('footer-text');
        const titleName = document.getElementById("username_ind");
        if (titleName) {
            titleName.textContent = `${baseName} | CP-Folio`;
        }
        if (footer) {
            footer.textContent = `© ${new Date().getFullYear()} ${baseName}`;
        }

        // Codeforces profile link from config
        const cfLink = document.getElementById('cf-profile-link');
        if (cfLink && config.codeforces_account) {
            cfLink.href = config.codeforces_account;
        }

        // Apply user accent color if provided
        if (config.color) {
            const root = document.documentElement;
            root.style.setProperty('--accent', config.color);
            root.style.setProperty('--accent-2', config.color);
            root.style.setProperty('--primary', config.color);
            root.style.setProperty('--secondary', config.color);
        }
    })
    .catch(() => {
        const footer = document.getElementById('footer-text');
        if (footer) {
            footer.textContent = `© ${new Date().getFullYear()} CP-Folio`;
        }
    });
//-------------------------------------------------
//-------------------------------------------------

// Home stats (only on root page)
const isHomePage = !isInPages;
const isViewerPage = document.body?.dataset?.pageTitle === 'Viewer';
if (isHomePage) {
    const stats = {
        totalProblems: 0,
        practiceProblems: 0,
        contestProblems: 0,
        sprintProblems: 0,
        virtualProblems: 0,
    };

    // Known problem files per area; extend these arrays when new problems are added
    const practiceProblems = [
        './CP-CODE/PRACTISE/Magnets.py',
        './CP-CODE/PRACTISE/Magic-Wizardry-Wonders.py',
        './CP-CODE/PRACTISE/In_quest_of_an_easy_problem.py',
        './CP-CODE/PRACTISE/Petya&Strings.py',
        './CP-CODE/PRACTISE/Next_Round.py',
        './CP-CODE/PRACTISE/Near_lucky.py',
        './CP-CODE/PRACTISE/Soldier_Banana.py',
        './CP-CODE/PRACTISE/Helpful-Math.py',
        './CP-CODE/PRACTISE/George_&_Accomodation.py',
        './CP-CODE/PRACTISE/Watermelon.py',
        './CP-CODE/PRACTISE/Translation.py',
        './CP-CODE/PRACTISE/Tram.py',
        './CP-CODE/PRACTISE/text.py',
        './CP-CODE/PRACTISE/Team.py',
        './CP-CODE/PRACTISE/Stone_on_table.py',
        './CP-CODE/PRACTISE/Function_calculating.py',
        './CP-CODE/PRACTISE/Fence_Bending.py',
    ];

    const contestProblems = [
        './CP-CODE/CONTESTS/CONTEST-1/Shortest_incresing_Path.py',
        './CP-CODE/CONTESTS/CONTEST-2/AAandBB.py',
        './CP-CODE/CONTESTS/CONTEST-3/nephew.py',
        './CP-CODE/CONTESTS/CONTEST-3/sample_contest_problem.py',
    ];

    const sprintProblems = [
        './CP-CODE/SPRINTS/SPRINT-BLOCK-1/sprint_placeholder_1.py',
        './CP-CODE/SPRINTS/SPRINT-BLOCK-1/sprint_placeholder_2.py',
        './CP-CODE/SPRINTS/SPRINT-BLOCK-2/sprint_placeholder_3.py',
        './CP-CODE/SPRINTS/SPRINT-BLOCK-2/sprint_placeholder_4.py',
    ];

    const virtualProblems = [
        './CP-CODE/VIRTUAL-CONTESTS/CONTEST-1/virtual_placeholder_1.py',
        './CP-CODE/VIRTUAL-CONTESTS/CONTEST-2/virtual_placeholder_2.py',
        './CP-CODE/VIRTUAL-CONTESTS/CONTEST-3/virtual_placeholder_3.py',
        './CP-CODE/VIRTUAL-CONTESTS/CONTEST-3/virtual_placeholder_4.py',
    ];

    const updateStat = (id, value) => {
        const el = document.getElementById(id);
        if (el) el.textContent = value.toString();
    };

    const ping = path => fetch(path, { method: 'HEAD' });

    const countExisting = paths => Promise.all(paths.map(p => ping(p).then(() => true).catch(() => false)))
        .then(results => results.filter(Boolean).length);

    Promise.all([
        countExisting(practiceProblems),
        countExisting(contestProblems),
        countExisting(sprintProblems),
        countExisting(virtualProblems),
    ]).then(([practiceCount, contestCount, sprintCount, virtualCount]) => {
        stats.practiceProblems = practiceCount;
        stats.contestProblems = contestCount;
        stats.sprintProblems = sprintCount;
        stats.virtualProblems = virtualCount;
        stats.totalProblems = practiceCount + contestCount + sprintCount + virtualCount;

        updateStat('stat-practice-problems', stats.practiceProblems);
        updateStat('stat-contest-problems', stats.contestProblems);
        updateStat('stat-sprint-problems', stats.sprintProblems);
        updateStat('stat-virtual-problems', stats.virtualProblems);
        updateStat('stat-total-problems', stats.totalProblems);
    });

    const takeFirstN = (arr, n = 4) => arr.slice(0, n);
    const makeViewerLink = path => `./pages/viewer.html?file=${encodeURIComponent(path)}`;

    const renderList = (items, targetId) => {
        const el = document.getElementById(targetId);
        if (!el) return;
        if (!items.length) {
            el.innerHTML = '<li><a aria-label="No items"><span class="recent-title">No items yet</span></a></li>';
            return;
        }
        el.innerHTML = items.map(item => `
            <li>
                <a href="${makeViewerLink(item.path)}">
                    <span class="recent-title">${item.label}</span>
                    <span class="recent-snippet">${item.snippet}</span>
                </a>
            </li>
        `).join('');
    };

    const practiceList = [
        { path: './CP-CODE/PRACTISE/Fence_Bending.py', label: 'Fence_Bending.py', snippet: 'Greedy check for fence bending constraints.' },
        { path: './CP-CODE/PRACTISE/Function_calculating.py', label: 'Function_calculating.py', snippet: 'Implements a math function computation.' },
        { path: './CP-CODE/PRACTISE/Stone_on_table.py', label: 'Stone_on_table.py', snippet: 'Counts removals for adjacent stones.' },
        { path: './CP-CODE/PRACTISE/Team.py', label: 'Team.py', snippet: 'Counts problems solved by a team trio.' },
        { path: './CP-CODE/PRACTISE/text.py', label: 'text.py', snippet: 'Utility practice script.' },
    ];

    const contestList = [
        { path: './CP-CODE/CONTESTS/CONTEST-3/sample_contest_problem.py', label: 'sample_contest_problem.py', snippet: 'Placeholder contest solution.' },
        { path: './CP-CODE/CONTESTS/CONTEST-3/nephew.py', label: 'nephew.py', snippet: 'Contest solution in CONTEST-3.' },
        { path: './CP-CODE/CONTESTS/CONTEST-2/AAandBB.py', label: 'AAandBB.py', snippet: 'Contest solution in CONTEST-2.' },
        { path: './CP-CODE/CONTESTS/CONTEST-1/Shortest_incresing_Path.py', label: 'Shortest_incresing_Path.py', snippet: 'Path problem from CONTEST-1.' },
    ];

    const virtualList = [
        { path: './CP-CODE/VIRTUAL-CONTESTS/CONTEST-3/virtual_placeholder_4.py', label: 'virtual_placeholder_4.py', snippet: 'Virtual contest 3 placeholder 2.' },
        { path: './CP-CODE/VIRTUAL-CONTESTS/CONTEST-3/virtual_placeholder_3.py', label: 'virtual_placeholder_3.py', snippet: 'Virtual contest 3 placeholder 1.' },
        { path: './CP-CODE/VIRTUAL-CONTESTS/CONTEST-2/virtual_placeholder_2.py', label: 'virtual_placeholder_2.py', snippet: 'Virtual contest 2 placeholder.' },
        { path: './CP-CODE/VIRTUAL-CONTESTS/CONTEST-1/virtual_placeholder_1.py', label: 'virtual_placeholder_1.py', snippet: 'Virtual contest 1 placeholder.' },
    ];

    const sprintList = [
        { path: './CP-CODE/SPRINTS/SPRINT-BLOCK-2/sprint_placeholder_4.py', label: 'sprint_placeholder_4.py', snippet: 'Sprint block 2 placeholder 2.' },
        { path: './CP-CODE/SPRINTS/SPRINT-BLOCK-2/sprint_placeholder_3.py', label: 'sprint_placeholder_3.py', snippet: 'Sprint block 2 placeholder 1.' },
        { path: './CP-CODE/SPRINTS/SPRINT-BLOCK-1/sprint_placeholder_2.py', label: 'sprint_placeholder_2.py', snippet: 'Sprint block 1 placeholder 2.' },
        { path: './CP-CODE/SPRINTS/SPRINT-BLOCK-1/sprint_placeholder_1.py', label: 'sprint_placeholder_1.py', snippet: 'Sprint block 1 placeholder 1.' },
    ];

    renderList(takeFirstN(practiceList), 'recent-practice');
    renderList(takeFirstN(contestList), 'recent-contests');
    renderList(takeFirstN(virtualList), 'recent-virtual');
    renderList(takeFirstN(sprintList), 'recent-sprints');
}

// Viewer page logic: fetch and render code with optional highlighting
if (isViewerPage) {
    const params = new URLSearchParams(window.location.search);
    const rawFile = params.get('file');
    const filenameEl = document.getElementById('viewer-filename');
    const codeEl = document.getElementById('viewer-code');
    const errorEl = document.getElementById('viewer-error');
    const copyBtn = document.getElementById('copy-btn');

    const showError = msg => {
        if (errorEl) {
            errorEl.textContent = msg;
            errorEl.style.display = 'block';
        }
    };

    if (!rawFile || !(rawFile.startsWith('./CP-CODE/') || rawFile.startsWith('CP-CODE/'))) {
        if (filenameEl) filenameEl.textContent = 'Invalid file';
        showError('Invalid or missing file parameter.');
    } else {
        const cleanPath = rawFile.startsWith('./') ? rawFile.slice(2) : rawFile;
        const fetchPath = `../${cleanPath}`;
        if (filenameEl) filenameEl.textContent = cleanPath;

        fetch(fetchPath)
            .then(res => {
                if (!res.ok) throw new Error(`Failed to load file (${res.status})`);
                return res.text();
            })
            .then(text => {
                if (codeEl) {
                    codeEl.textContent = text;
                    if (window.hljs) {
                        window.hljs.highlightElement(codeEl);
                    }
                }
            })
            .catch(err => {
                showError(err.message);
            });

        if (copyBtn) {
            copyBtn.addEventListener('click', () => {
                if (!codeEl) return;
                navigator.clipboard.writeText(codeEl.textContent || '')
                    .then(() => {
                        copyBtn.textContent = 'Copied';
                        setTimeout(() => (copyBtn.textContent = 'Copy'), 1200);
                    })
                    .catch(() => showError('Unable to copy content.'));
            });
        }
    }
}

// Mobile navigation toggle
const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');
const navLinks = document.querySelectorAll('.nav__link');

if (navToggle && siteNav) {
    navToggle.addEventListener('click', () => {
        const isOpen = siteNav.classList.toggle('is-open');
        navToggle.setAttribute('aria-expanded', isOpen);
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (siteNav.classList.contains('is-open')) {
                siteNav.classList.remove('is-open');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });
}
