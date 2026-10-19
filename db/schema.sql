-- Soluciones VSJ - Alerta Temprana
-- Esquema de base de datos PostgreSQL
-- Basado en el diccionario de datos de RTF1 - Modelo de análisis (sección 5.2)

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =========================================================
-- Tabla: usuarios
-- =========================================================
CREATE TABLE IF NOT EXISTS usuarios (
    id                     UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    correo_institucional   VARCHAR(150) NOT NULL UNIQUE,
    nombre                 VARCHAR(100) NOT NULL,
    password_hash          VARCHAR(255) NOT NULL,
    creado_en              TIMESTAMPTZ NOT NULL DEFAULT now(),

    -- RN-01: solo correos institucionales @soyudemedellin.edu.co
    CONSTRAINT chk_correo_institucional
        CHECK (correo_institucional LIKE '%@soyudemedellin.edu.co')
);

-- =========================================================
-- Tabla: materias
-- =========================================================
CREATE TABLE IF NOT EXISTS materias (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id  UUID NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    nombre      VARCHAR(100) NOT NULL,
    nota        NUMERIC(2,1) NOT NULL,
    creado_en   TIMESTAMPTZ NOT NULL DEFAULT now(),
    actualizado_en TIMESTAMPTZ NOT NULL DEFAULT now(),

    -- RF-02: la nota debe estar en escala 0.0 - 5.0
    CONSTRAINT chk_nota_rango CHECK (nota >= 0.0 AND nota <= 5.0)
);

CREATE INDEX IF NOT EXISTS idx_materias_usuario_id ON materias(usuario_id);

-- =========================================================
-- Tabla: encuestas
-- Solo se conserva la última encuesta vigente por usuario (ver 5.1 del
-- documento de análisis), por eso usuario_id es UNIQUE.
-- =========================================================
CREATE TABLE IF NOT EXISTS encuestas (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id      UUID NOT NULL UNIQUE REFERENCES usuarios(id) ON DELETE CASCADE,
    fecha_respuesta TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- =========================================================
-- Tabla: respuestas_encuesta
-- 6 preguntas, cada respuesta en escala 1-5 (emojis en el frontend)
-- =========================================================
CREATE TABLE IF NOT EXISTS respuestas_encuesta (
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    encuesta_id  UUID NOT NULL REFERENCES encuestas(id) ON DELETE CASCADE,
    pregunta_id  INTEGER NOT NULL,
    valor        INTEGER NOT NULL,

    CONSTRAINT chk_pregunta_id_rango CHECK (pregunta_id BETWEEN 1 AND 6),
    CONSTRAINT chk_valor_rango CHECK (valor BETWEEN 1 AND 5),
    CONSTRAINT uq_encuesta_pregunta UNIQUE (encuesta_id, pregunta_id)
);

CREATE INDEX IF NOT EXISTS idx_respuestas_encuesta_id ON respuestas_encuesta(encuesta_id);

-- =========================================================
-- Trigger: mantener actualizado_en al día en materias
-- =========================================================
CREATE OR REPLACE FUNCTION set_actualizado_en()
RETURNS TRIGGER AS $$
BEGIN
    NEW.actualizado_en = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_materias_actualizado_en ON materias;
CREATE TRIGGER trg_materias_actualizado_en
    BEFORE UPDATE ON materias
    FOR EACH ROW
    EXECUTE FUNCTION set_actualizado_en();

-- =========================================================
-- Datos de prueba (solo para desarrollo local / demo)
-- =========================================================
-- Este esquema NO inserta usuarios de prueba con contraseña fija: un hash
-- bcrypt escrito a mano aquí no sería válido (bcrypt genera un salt distinto
-- cada vez) y daría una falsa sensación de que el login funciona.
-- Para crear los usuarios de prueba reales, ejecute, luego de `npm install`:
--   npm run db:seed
-- (ver backend/src/db/seed.ts, que sí genera el hash con bcryptjs en tiempo
-- de ejecución a partir de una contraseña legible).
