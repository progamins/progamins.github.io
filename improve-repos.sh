#!/usr/bin/env bash
# ============================================================
# Mejora visual de la pestaña de repositorios de progamins
#   - Descripciones profesionales (se muestran bajo cada repo)
#   - Topics técnicos reales (chips de color bajo cada repo)
#
# Requiere un token de GitHub con scope:
#   - Classic: public_repo  (suficiente para repos públicos)
#   - Fine-grained: "Administration: Write" en los repos
#
# Uso:
#   GITHUB_TOKEN=ghp_xxx ./improve-repos.sh   # aplicar cambios
#   DRY_RUN=1 ./improve-repos.sh              # solo previsualizar
# ============================================================
set -euo pipefail

TOKEN="${GITHUB_TOKEN:-}"
DRY_RUN="${DRY_RUN:-0}"

if [ -z "$TOKEN" ] && [ "$DRY_RUN" != "1" ]; then
  echo "❌ Define GITHUB_TOKEN primero, ej: GITHUB_TOKEN=ghp_xxx ./improve-repos.sh"
  echo "   (o usa DRY_RUN=1 para solo previsualizar)"
  exit 1
fi

API="https://api.github.com/repos/progamins"
TMP="${TMPDIR:-/tmp}"

# ---------- Descripciones profesionales ----------
declare -A DESCS=(
  ["progamins.github.io"]="Portafolio personal bilingüe (ES/EN) — Full-Stack Developer. Build. Experiment. Ship. HTML, CSS y JavaScript."
  ["webhermanos"]="Maison Rosas — E-commerce full-stack para una pastelería peruana: catálogo, pedidos con seguimiento, panel admin multi-rol, PWA offline y tiempo real. En producción."
  ["iestp"]="Sistema de gestión académica en PHP y MySQL: asistencias con QR, horarios, unidades didácticas, justificaciones, pagos y reportes PDF."
  ["proceso-nodes"]="API REST en Node.js y Express con MySQL: estudiantes, notas, horarios, justificaciones con imágenes y códigos QR — JWT, bcrypt, rate limiting y tests."
  ["android-login-sqlserver"]="App Android de autenticación en Java con conexión a SQL Server (jTDS / MS SQL JDBC)."
  ["aplicativo-java"]="App Android (Kotlin + Compose) de autenticación con API REST (Node.js + Express) — JWT con refresh tokens, Docker y SQLite/MySQL."
  ["tortas-web"]="Web de tortas y pasteles para un emprendimiento familiar — catálogo de productos y pedidos."
  ["progamins"]="Perfil de GitHub de Progamins — Full-Stack Developer. Build. Experiment. Ship."
)

# ---------- Topics técnicos reales (chips de color) ----------
declare -A TOPICS=(
  ["progamins.github.io"]="portfolio,html,css,javascript,github-pages,responsive-design,seo,bilingual,full-stack-developer,peru"
  ["webhermanos"]="react,typescript,express,mysql,nodejs,tailwindcss,docker,pwa,ecommerce,full-stack,vercel,production"
  ["iestp"]="php,mysql,bootstrap,pdo,fpdf,gestion-academica,asistencia,qr,horarios,instituto,sistema-web"
  ["proceso-nodes"]="nodejs,express,mysql,rest-api,jwt,bcrypt,rate-limiting,qrcode,tests,backend"
  ["android-login-sqlserver"]="android,java,sql-server,jtds,jdbc,authentication,mobile"
  ["aplicativo-java"]="android,kotlin,jetpack-compose,retrofit,nodejs,express,docker,mysql,sqlite,jwt,rest-api,authentication"
  ["tortas-web"]="web,pasteleria,emprendimiento,ecommerce,catalogo"
  ["progamins"]="profile,readme,github-profile,full-stack-developer"
)

for repo in "${!DESCS[@]}"; do
  echo "━━━ $repo ━━━"

  desc="${DESCS[$repo]}"
  topics="${TOPICS[$repo]}"

  if [ "$DRY_RUN" = "1" ]; then
    echo "  desc:   $desc"
    echo "  topics: $topics"
    continue
  fi

  # 1) Descripción (payload en archivo para evitar problemas de codificación UTF-8)
  node -e 'process.stdout.write(JSON.stringify({description: process.argv[1]}))' "$desc" > "$TMP/progamins-payload.json"
  curl -s -X PATCH "$API/$repo" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Accept: application/vnd.github+json" \
    --data-binary @"$TMP/progamins-payload.json" \
    | node -e "let d='';process.stdin.on('data',c=>d+=c).on('end',()=>{const r=JSON.parse(d);console.log(r.description?('  ✓ desc: '+r.description):('  ✗ '+(r.message||'error')))})"

  # 2) Topics
  names="["
  IFS=',' read -ra arr <<< "$topics"
  for t in "${arr[@]}"; do names+="\"$t\","; done
  names="${names%,}]"
  curl -s -X PUT "$API/$repo/topics" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Accept: application/vnd.github+json" \
    -d "{\"names\": $names}" \
    | node -e "let d='';process.stdin.on('data',c=>d+=c).on('end',()=>{const r=JSON.parse(d);console.log(r.names?('  ✓ topics: '+r.names.join(', ')):('  ✗ '+(r.message||'error')))})"
done

echo ""
if [ "$DRY_RUN" = "1" ]; then
  echo "✅ Vista previa lista. Ejecuta con GITHUB_TOKEN=ghp_xxx ./improve-repos.sh para aplicar."
else
  echo "✅ Listo. Recarga https://github.com/progamins?tab=repositories para ver los cambios."
fi
