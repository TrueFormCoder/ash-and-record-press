// ELEOS Worker — Doctrine Routes Patch
// Add these handler functions BEFORE the default export in index.js
// Add the routing entries inside the try block, BEFORE the 404 catch-all
// Date: 2026-04-04

// ===== HANDLER FUNCTIONS (add after handleCreateCharacter) =====

async function handleDoctrineGet(db, archetypeId) {
  const result = await db.prepare(
    'SELECT * FROM archetype_doctrine WHERE archetype_id = ?'
  ).bind(archetypeId).first();
  if (!result) return err('Archetype doctrine not found', 404);
  return json(result);
}

async function handleDoctrineDiagnose(db, diamondMode) {
  const result = await db.prepare(
    `SELECT archetype_name, mapped_function, mapped_distortion,
     healing_task, anti_pattern, missing_counter_roles, diagnostic_trigger
     FROM archetype_doctrine WHERE archetype_id = ? AND strategy_label = 'Diamond Regime'`
  ).bind(diamondMode).first();
  if (!result) return err('Diamond not found. Valid: white_diamond, yellow_diamond, blue_diamond, pink_diamond', 404);
  return json(result);
}

async function handleDoctrineCounterRoles(db) {
  const results = await db.prepare(
    `SELECT archetype_id, archetype_name, mapped_function, anti_pattern, shadow, healing_task
     FROM archetype_doctrine WHERE strategy_label = 'Counter-Regime' ORDER BY id`
  ).all();
  return json(results.results);
}

async function handleDoctrineEewos(db) {
  const results = await db.prepare(
    'SELECT archetype_name, strategy_label, anti_pattern FROM archetype_doctrine ORDER BY id'
  ).all();
  return json(results.results);
}

async function handleDoctrineDiamonds(db) {
  const results = await db.prepare(
    `SELECT archetype_id, archetype_name, mapped_function, diagnostic_trigger, missing_counter_roles
     FROM archetype_doctrine WHERE strategy_label = 'Diamond Regime' ORDER BY id`
  ).all();
  return json(results.results);
}

async function handleDoctrineAll(db) {
  const results = await db.prepare(
    'SELECT id, archetype_id, archetype_name, strategy_label, anti_pattern FROM archetype_doctrine ORDER BY id'
  ).all();
  return json({ count: results.results.length, records: results.results });
}

// ===== ROUTING ENTRIES (add inside try block, before the 404) =====
// IMPORTANT: Static paths must come BEFORE parameterized paths

// Doctrine: list all
// if (path === '/api/doctrine') return handleDoctrineAll(db);

// Doctrine: counter-roles (9 Crystal Gem roles)
// if (path === '/api/doctrine/counter-roles') return handleDoctrineCounterRoles(db);

// Doctrine: all anti-patterns / eewos
// if (path === '/api/doctrine/eewos') return handleDoctrineEewos(db);

// Doctrine: all Diamond diagnostic lanes
// if (path === '/api/doctrine/diamonds') return handleDoctrineDiamonds(db);

// Doctrine: Diamond diagnostic by mode
// if ((m = path.match(/^\/api\/doctrine\/diagnose\/([a-z_]+)$/)) && method === 'GET')
//   return handleDoctrineDiagnose(db, m[1]);

// Doctrine: single archetype lookup (must be LAST - catches any /api/doctrine/:id)
// if ((m = path.match(/^\/api\/doctrine\/([a-z_]+)$/)) && method === 'GET')
//   return handleDoctrineGet(db, m[1]);

// ===== UPDATE STATUS ENDPOINT =====
// Add 'archetype_doctrine' to the status table count list:
// for (const t of ["archetypes", ... "archetype_doctrine", "encounter_templates", ...])

// ===== UPDATE 404 MESSAGE =====
// Add to the endpoint list in the 404 response:
// /api/doctrine, /api/doctrine/:id, /api/doctrine/counter-roles, /api/doctrine/eewos,
// /api/doctrine/diamonds, /api/doctrine/diagnose/:diamond_mode
