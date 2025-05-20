<h1 align="center" style="color:#6B46C1;">✨ Simple Blog ✨</h1>

<p align="center">
  A modern blog built with <strong>Next.js (App Router)</strong>, <strong>TypeScript</strong>, <strong>Tailwind CSS</strong>, and <strong>Neon</strong> for PostgreSQL storage. 
  It fetches posts from <code>JSONPlaceholder</code>, caches them in a Neon database, and features animations with Framer Motion & GSAP.
</p>

<hr/>

<h2 style="color:#6B46C1;"> Features</h2>

<ul>
  <li><strong>Homepage:</strong> Animated post cards with search, category, author, and date filters.</li>
  <li><strong>Post Pages:</strong> Client-side fetched post details with author and category metadata.</li>
  <li><strong>Database:</strong> Neon PostgreSQL caches posts with <code>title</code>, <code>body</code>, <code>author_name</code>, <code>category</code>, etc.</li>
  <li><strong>Styling:</strong> Clean Tailwind design with <code>bg-gray-50</code> and <code>text-purple-600</code>.</li>
  <li><strong>Footer:</strong> Responsive footer with logo, navigation, and social links.</li>
</ul>

<h2 style="color:#6B46C1;"> Prerequisites</h2>

<ul>
  <li>Node.js 18+</li>
  <li>npm 8+</li>
  <li>Neon Account</li>
  <li>Git & VS Code</li>
</ul>

<h2 style="color:#6B46C1;"> Setup Neon Database</h2>

<ol>
  <li>Create a project in <a href="https://neon.tech/" target="_blank">Neon Console</a>.</li>
  <li>Copy the connection string (<code>postgres://...</code>).</li>
  <li>Open SQL Editor and run:</li>
</ol>

```sql
DROP TABLE IF EXISTS posts;
CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    jsonplaceholder_id INTEGER UNIQUE,
    title VARCHAR(255),
    body TEXT,
    user_id INTEGER,
    image_url VARCHAR(255),
    thumbnail_url VARCHAR(255),
    author_name VARCHAR(100),
    category VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

<h2 style="color:#6B46C1;">⚙️ Local Setup</h2>

# Clone project
git clone https://github.com/&lt;your-username&gt;/blog-app.git
cd blog-app

# Install dependencies
npm install

# Add environment variables
touch .env.local
# Add DATABASE_URL inside it

<h2 style="color:#6B46C1;"> Run the App</h2>

npm run dev

npm run dev

Visit http://localhost:3000 and test the homepage, post detail page, and footer.

<h2 style="color:#6B46C1;">🧪 Verify & Troubleshoot</h2> <ul> <li>Ensure Footer is imported correctly (case-sensitive)</li> <li>Check Neon DB using SQL Editor</li> <li>Debug any database or fetch issues in <code>src/lib/actions.ts</code></li> <li>Clear Next.js cache if needed: <code>rm -rf .next</code></li> </ul> <h2 style="color:#6B46C1;">🌐 Deployment (Vercel)</h2>



git push origin main
vercel --prod


Add DATABASE_URL as an environment variable in the Vercel dashboard.

<h2 style="color:#6B46C1;">📁 Project Structure</h2>

blog-app/
├── components/
│   ├── Footer.tsx
│   ├── Header.tsx
├── src/
│   ├── app/
│   │   ├── (home)/
│   │   │   ├── page.tsx
│   │   │   ├── loading.tsx
│   │   ├── (post)/
│   │   │   ├── post/
│   │   │   │   ├── [id]/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   ├── loading.tsx
│   │   ├── layout.tsx
│   │   ├── globals.css
│   ├── lib/
│   │   ├── actions.ts
│   │   ├── types.ts
├── .env.local
├── next.config.mjs
├── package.json
├── README.md

<h2 style="color:#6B46C1;"> Contributing</h2> <ol> <li>Fork the repository</li> <li>Create your feature branch: <code>git checkout -b feature/awesome-feature</code></li> <li>Commit changes: <code>git commit -m "Add awesome feature"</code></li> <li>Push to branch: <code>git push origin feature/awesome-feature</code></li> <li>Open a pull request</li> </ol>


<h3 align="center" style="color:#6B46C1;">Built with using Next.js, Tailwind, and Neon</h3>
