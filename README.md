# CallHub Website

This repository contains the CallHub website built with React + Vite and Tailwind.

Quick start (PowerShell)

1. Install dependencies

```powershell
npm install
```

2. Run dev server

```powershell
npm run dev
# open http://localhost:3000
```

3. Build for production

```powershell
npm run build
```

Deploy to GitHub Pages

- This repo includes a GitHub Actions workflow that builds the project and deploys the `dist/` folder to GitHub Pages whenever you push to the `main` branch.
- To publish your site:

```powershell
# set remote if not already set (replace URL with your repo)
git remote add origin https://github.com/<your-username>/<your-repo>.git
# commit any changes
git add .
git commit -m "Deploy site"
# push to main
git push -u origin main
```

After the push, the Actions workflow will run, build the site, and deploy to GitHub Pages. You can view the GitHub Actions run in the repository's Actions tab.

If your repository already has a 'coming soon' static page in GitHub Pages, this workflow will overwrite the published content with the built `dist/` files on the next successful deploy from `main`.