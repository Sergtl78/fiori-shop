--
-- PostgreSQL database cluster dump
--

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Drop databases (except postgres and template1)
--

DROP DATABASE shop;




--
-- Drop roles
--

DROP ROLE fiori;


--
-- Roles
--

CREATE ROLE fiori;
ALTER ROLE fiori WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS PASSWORD 'SCRAM-SHA-256$4096:rhYS4lLhVC79pJ7LswHcQg==$PK2ptbxZwWK+YtazZN8gpS/V2EA+JOMU+4w3dSN77vM=:tcA4wF6TIE2hyV4U5cWDrrwFcc2i4zJVr4UFZqgMRU4=';






--
-- Databases
--

--
-- Database "template1" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 14.8
-- Dumped by pg_dump version 14.8

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

UPDATE pg_catalog.pg_database SET datistemplate = false WHERE datname = 'template1';
DROP DATABASE template1;
--
-- Name: template1; Type: DATABASE; Schema: -; Owner: fiori
--

CREATE DATABASE template1 WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.utf8';


ALTER DATABASE template1 OWNER TO fiori;

\connect template1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: DATABASE template1; Type: COMMENT; Schema: -; Owner: fiori
--

COMMENT ON DATABASE template1 IS 'default template for new databases';


--
-- Name: template1; Type: DATABASE PROPERTIES; Schema: -; Owner: fiori
--

ALTER DATABASE template1 IS_TEMPLATE = true;


\connect template1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: DATABASE template1; Type: ACL; Schema: -; Owner: fiori
--

REVOKE CONNECT,TEMPORARY ON DATABASE template1 FROM PUBLIC;
GRANT CONNECT ON DATABASE template1 TO PUBLIC;


--
-- PostgreSQL database dump complete
--

--
-- Database "postgres" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 14.8
-- Dumped by pg_dump version 14.8

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE postgres;
--
-- Name: postgres; Type: DATABASE; Schema: -; Owner: fiori
--

CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.utf8';


ALTER DATABASE postgres OWNER TO fiori;

\connect postgres

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: DATABASE postgres; Type: COMMENT; Schema: -; Owner: fiori
--

COMMENT ON DATABASE postgres IS 'default administrative connection database';


--
-- PostgreSQL database dump complete
--

--
-- Database "shop" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 14.8
-- Dumped by pg_dump version 14.8

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: shop; Type: DATABASE; Schema: -; Owner: fiori
--

CREATE DATABASE shop WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.utf8';


ALTER DATABASE shop OWNER TO fiori;

\connect shop

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Account; Type: TABLE; Schema: public; Owner: fiori
--

CREATE TABLE public."Account" (
    "userId" text NOT NULL,
    type text NOT NULL,
    provider text NOT NULL,
    "providerAccountId" text NOT NULL,
    refresh_token text,
    access_token text,
    expires_at integer,
    token_type text,
    scope text,
    id_token text,
    session_state text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Account" OWNER TO fiori;

--
-- Name: Authenticator; Type: TABLE; Schema: public; Owner: fiori
--

CREATE TABLE public."Authenticator" (
    id text NOT NULL,
    "credentialID" text NOT NULL,
    "userId" text NOT NULL,
    "providerAccountId" text NOT NULL,
    "credentialPublicKey" text NOT NULL,
    counter integer NOT NULL,
    "credentialDeviceType" text NOT NULL,
    "credentialBackedUp" boolean NOT NULL,
    transports text
);


ALTER TABLE public."Authenticator" OWNER TO fiori;

--
-- Name: Category; Type: TABLE; Schema: public; Owner: fiori
--

CREATE TABLE public."Category" (
    id text NOT NULL,
    name text NOT NULL,
    visible boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "main_categoryId" text
);


ALTER TABLE public."Category" OWNER TO fiori;

--
-- Name: Colection; Type: TABLE; Schema: public; Owner: fiori
--

CREATE TABLE public."Colection" (
    id text NOT NULL,
    name text NOT NULL,
    visible boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "imageId" text NOT NULL
);


ALTER TABLE public."Colection" OWNER TO fiori;

--
-- Name: Color; Type: TABLE; Schema: public; Owner: fiori
--

CREATE TABLE public."Color" (
    id text NOT NULL,
    name text NOT NULL,
    visible boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    hex text NOT NULL
);


ALTER TABLE public."Color" OWNER TO fiori;

--
-- Name: Image; Type: TABLE; Schema: public; Owner: fiori
--

CREATE TABLE public."Image" (
    id text NOT NULL,
    name text NOT NULL,
    url text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "productId" text,
    "userId" text
);


ALTER TABLE public."Image" OWNER TO fiori;

--
-- Name: Main_category; Type: TABLE; Schema: public; Owner: fiori
--

CREATE TABLE public."Main_category" (
    id text NOT NULL,
    name text NOT NULL,
    visible boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Main_category" OWNER TO fiori;

--
-- Name: Product; Type: TABLE; Schema: public; Owner: fiori
--

CREATE TABLE public."Product" (
    id text NOT NULL,
    sku text NOT NULL,
    name text NOT NULL,
    description text NOT NULL,
    price integer NOT NULL,
    growth integer NOT NULL,
    quantity integer NOT NULL,
    min_quantity integer DEFAULT 1 NOT NULL,
    delivery timestamp(3) without time zone NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "main_categoryId" text,
    "categoryId" text,
    "sub_categoryId" text,
    "vendorId" text,
    "colorId" text
);


ALTER TABLE public."Product" OWNER TO fiori;

--
-- Name: Session; Type: TABLE; Schema: public; Owner: fiori
--

CREATE TABLE public."Session" (
    "sessionToken" text NOT NULL,
    "userId" text NOT NULL,
    expires timestamp(3) without time zone NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Session" OWNER TO fiori;

--
-- Name: Sub_category; Type: TABLE; Schema: public; Owner: fiori
--

CREATE TABLE public."Sub_category" (
    id text NOT NULL,
    name text NOT NULL,
    visible boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "main_categoryId" text,
    "categoryId" text
);


ALTER TABLE public."Sub_category" OWNER TO fiori;

--
-- Name: User; Type: TABLE; Schema: public; Owner: fiori
--

CREATE TABLE public."User" (
    id text NOT NULL,
    email text NOT NULL,
    "emailVerified" timestamp(3) without time zone,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    password text,
    blocked boolean DEFAULT false NOT NULL,
    image text,
    "lastName" text,
    phone text,
    name text NOT NULL,
    role text DEFAULT 'USER'::text NOT NULL
);


ALTER TABLE public."User" OWNER TO fiori;

--
-- Name: Vendor; Type: TABLE; Schema: public; Owner: fiori
--

CREATE TABLE public."Vendor" (
    id text NOT NULL,
    name text NOT NULL,
    visible boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Vendor" OWNER TO fiori;

--
-- Name: VerificationToken; Type: TABLE; Schema: public; Owner: fiori
--

CREATE TABLE public."VerificationToken" (
    identifier text NOT NULL,
    token text NOT NULL,
    expires timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."VerificationToken" OWNER TO fiori;

--
-- Name: _ColectionToProduct; Type: TABLE; Schema: public; Owner: fiori
--

CREATE TABLE public."_ColectionToProduct" (
    "A" text NOT NULL,
    "B" text NOT NULL
);


ALTER TABLE public."_ColectionToProduct" OWNER TO fiori;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: fiori
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO fiori;

--
-- Data for Name: Account; Type: TABLE DATA; Schema: public; Owner: fiori
--

COPY public."Account" ("userId", type, provider, "providerAccountId", refresh_token, access_token, expires_at, token_type, scope, id_token, session_state, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Authenticator; Type: TABLE DATA; Schema: public; Owner: fiori
--

COPY public."Authenticator" (id, "credentialID", "userId", "providerAccountId", "credentialPublicKey", counter, "credentialDeviceType", "credentialBackedUp", transports) FROM stdin;
\.


--
-- Data for Name: Category; Type: TABLE DATA; Schema: public; Owner: fiori
--

COPY public."Category" (id, name, visible, "createdAt", "updatedAt", "main_categoryId") FROM stdin;
clv486c2l0004qdfrgl8vqv9r	Роза	t	2024-04-17 19:48:15.645	2024-04-18 14:08:05.564	clv486c250002qdfrpcbqtobd
clv486c2l0005qdfrf7usa5ko	Хризантема	t	2024-04-17 19:48:15.645	2024-04-18 14:08:05.564	clv486c250002qdfrpcbqtobd
clv486c2l0006qdfrmivwoc2l	Limonium	t	2024-04-17 19:48:15.645	2024-04-18 14:08:05.564	clv486c250002qdfrpcbqtobd
clv486c2l0007qdfr3wt0l0j7	Подсолнечник	t	2024-04-17 19:48:15.645	2024-04-18 14:08:05.564	clv486c250002qdfrpcbqtobd
clv486c2l0009qdfrq34ynxqr	Тюльпан	t	2024-04-17 19:48:15.645	2024-04-18 14:08:05.564	clv486c250002qdfrpcbqtobd
clv486c2l000aqdfrb4t92llh	Пионы	t	2024-04-17 19:48:15.645	2024-04-18 14:08:05.564	clv486c250002qdfrpcbqtobd
clv486c2l000bqdfryum401mi	Герберы	t	2024-04-17 19:48:15.645	2024-04-18 14:08:05.564	clv486c250002qdfrpcbqtobd
clv486c2l0008qdfrtp5steie	Solidago	t	2024-04-17 19:48:15.645	2024-04-18 14:08:05.564	clv486c250003qdfrh3h63x7f
\.


--
-- Data for Name: Colection; Type: TABLE DATA; Schema: public; Owner: fiori
--

COPY public."Colection" (id, name, visible, "createdAt", "updatedAt", "imageId") FROM stdin;
\.


--
-- Data for Name: Color; Type: TABLE DATA; Schema: public; Owner: fiori
--

COPY public."Color" (id, name, visible, "createdAt", "updatedAt", hex) FROM stdin;
clv486c3u000jqdfr410fy9as	Белый	t	2024-04-17 19:48:15.691	2024-04-17 19:48:15.691	#ffffff
clv486c3u000kqdfrjrm39c1f	Красный	t	2024-04-17 19:48:15.691	2024-04-17 19:48:15.691	#ff0000
clv486c3u000lqdfrwwklvodd	Фиолетовый	t	2024-04-17 19:48:15.691	2024-04-17 19:48:15.691	#bf00ff
clv486c3u000mqdfrlj0gkbp5	Оранжевый	t	2024-04-17 19:48:15.691	2024-04-17 19:48:15.691	#fd8e06
clv486c3u000nqdfrowp7c2r2	Желтый	t	2024-04-17 19:48:15.691	2024-04-17 19:48:15.691	#f9d903
clv486c3u000oqdfrkhslum63	Синий	t	2024-04-17 19:48:15.691	2024-04-17 19:48:15.691	#1200ff
clv486c3u000pqdfrw4bivoq8	Бордовый	t	2024-04-17 19:48:15.691	2024-04-17 19:48:15.691	#8c0202
clv486c3u000qqdfr42a8ytwq	Розовый	t	2024-04-17 19:48:15.691	2024-04-17 19:48:15.691	#f90aa6
clv486c3u000rqdfrf2squrl7	Голубой	t	2024-04-17 19:48:15.691	2024-04-17 19:48:15.691	#00b2fa
clv486c3u000sqdfrausyf0xf	Бежевый	t	2024-04-17 19:48:15.691	2024-04-17 19:48:15.691	#f6cfcf
\.


--
-- Data for Name: Image; Type: TABLE DATA; Schema: public; Owner: fiori
--

COPY public."Image" (id, name, url, "createdAt", "updatedAt", "productId", "userId") FROM stdin;
clv486c5d001zqdfrlga5lmxb	Coral Sunset2.png	https://test-for-flower.storage.yandexcloud.net/Coral_Sunset2_a9f9157aba.png	2024-04-17 19:48:15.745	2024-04-18 14:15:34.221	clv486c4g001aqdfr7zd8fmo6	\N
clv486c5d0020qdfrne8bvqa5	Yellow Gem.jpg	https://test-for-flower.storage.yandexcloud.net/Yellow_Gem_0a3b2220bc.jpg	2024-04-17 19:48:15.745	2024-04-18 14:15:34.221	clv486c4g001bqdfrsatzbrxg	\N
clv486c5d0021qdfr9tagygpm	Калинка.webp	https://test-for-flower.storage.yandexcloud.net/Kalinka_6a93c8511c.webp	2024-04-17 19:48:15.745	2024-04-18 14:15:34.221	clv486c4g000xqdfrx078krxx	\N
clv486c5d0022qdfrprjakv2m	Вера.webp	https://test-for-flower.storage.yandexcloud.net/Vera_ec50e3bf4e.webp	2024-04-17 19:48:15.745	2024-04-18 14:15:34.221	clv486c4g001cqdfr5dkjovsv	\N
clv486c5d0023qdfraablfopp	MONARCH.png	https://test-for-flower.storage.yandexcloud.net/MONARCH_858ca31e97.png	2024-04-17 19:48:15.745	2024-04-18 14:15:34.221	clv486c4g0012qdfrwdk2skp9	\N
clv486c5d001dqdfrk8f30fgy	Athena.jpg	https://test-for-flower.storage.yandexcloud.net/Athena_c8adec0b0b.jpg	2024-04-17 19:48:15.745	2024-04-18 14:15:34.221	clv486c4g000tqdfrp3809z84	\N
clv486c5d001eqdfrk4mozj5y	Antonov chr.jpg	https://test-for-flower.storage.yandexcloud.net/Antonov_chr_70968f5a43.jpg	2024-04-17 19:48:15.745	2024-04-18 14:15:34.221	clv486c4g000uqdfrpj0wuhb3	\N
clv486c5d001fqdfr111fezv8	biscue.jpg	https://test-for-flower.storage.yandexcloud.net/biscue_4bdc749b6d.jpg	2024-04-17 19:48:15.745	2024-04-18 14:15:34.221	clv486c4g000vqdfree1lx3x5	\N
clv486c5d001gqdfrww7vq2v9	solidago golden glory.jpg	https://test-for-flower.storage.yandexcloud.net/solidago_golden_glory_7c5a8bf426.jpg	2024-04-17 19:48:15.745	2024-04-18 14:15:34.221	clv486c4g000wqdfry6ri4krb	\N
clv486c5d001hqdfr2m63bn3d	heliantus vincent choice.jpg	https://test-for-flower.storage.yandexcloud.net/heliantus_vincent_choice_918d4f59d2.jpg	2024-04-17 19:48:15.745	2024-04-18 14:15:34.221	clv486c4g000yqdfrr3ikcx5s	\N
clv486c5d001iqdfrfko5vr9v	statice blue.jpg	https://test-for-flower.storage.yandexcloud.net/statice_blue_e7e5fa59df.jpg	2024-04-17 19:48:15.745	2024-04-18 14:15:34.221	clv486c4g000zqdfrhxsihzv9	\N
clv486c5d001jqdfrwel6bja2	statice pink.jpg	https://test-for-flower.storage.yandexcloud.net/statice_pink_f160c359ec.jpg	2024-04-17 19:48:15.745	2024-04-18 14:15:34.221	clv486c4g0010qdfrx2unug8o	\N
clv486c5d001kqdfrc4rk6id6	tu royal virgin.jpg	https://test-for-flower.storage.yandexcloud.net/tu_royal_virgin_f5240e9d2b.jpg	2024-04-17 19:48:15.745	2024-04-18 14:15:34.221	clv486c4g0011qdfr1t4pe3hw	\N
clv486c5d001lqdfri4v6fjij	fridom2_018dae2a59.jpg	https://test-for-flower.storage.yandexcloud.net/fridom2_018dae2a59_6da01198e8.jpg	2024-04-17 19:48:15.745	2024-04-18 14:15:34.221	clv486c4g0013qdfrrczrnojb	\N
clv486c5d001mqdfrpgxn2ksn	explorer.jpg	https://test-for-flower.storage.yandexcloud.net/explorer_9f2bd65731.jpg	2024-04-17 19:48:15.745	2024-04-18 14:15:34.221	clv486c4g0014qdfry35q7iqb	\N
clv486c5d001nqdfryd19fb9v	explorer2.jpg	https://test-for-flower.storage.yandexcloud.net/explorer2_28f62e5a9c.jpg	2024-04-17 19:48:15.745	2024-04-18 14:15:34.221	clv486c4g0014qdfry35q7iqb	\N
clv486c5d001oqdfr9lje79n6	Juliet.jpg	https://test-for-flower.storage.yandexcloud.net/Juliet_695a3ffe5d.jpg	2024-04-17 19:48:15.745	2024-04-18 14:15:34.221	clv486c4g0015qdfrxie99fay	\N
clv486c5d001pqdfrxpes3ju7	Juliet2.jpg	https://test-for-flower.storage.yandexcloud.net/Juliet2_8790eea467.jpg	2024-04-17 19:48:15.745	2024-04-18 14:15:34.221	clv486c4g0015qdfrxie99fay	\N
clv486c5d001qqdfriek39l61	Patience2.jpg	https://test-for-flower.storage.yandexcloud.net/Patience2_466b611fbf.jpg	2024-04-17 19:48:15.745	2024-04-18 14:15:34.221	clv486c4g0016qdfr3k5grv5i	\N
clv486c5d001rqdfrys4zweny	Patience.jpg	https://test-for-flower.storage.yandexcloud.net/Patience_0ac903d1a4.jpg	2024-04-17 19:48:15.745	2024-04-18 14:15:34.221	clv486c4g0016qdfr3k5grv5i	\N
clv486c5d001sqdfr9satuzcv	Princess Anne.jpg	https://test-for-flower.storage.yandexcloud.net/Princess_Anne_5f45e37356.jpg	2024-04-17 19:48:15.745	2024-04-18 14:15:34.221	clv486c4g0017qdfrf3jgap69	\N
clv486c5d001tqdfr4cpdw9lv	Princess Anne2.jpg	https://test-for-flower.storage.yandexcloud.net/Princess_Anne2_014fbb2f1c.jpg	2024-04-17 19:48:15.745	2024-04-18 14:15:34.221	clv486c4g0017qdfrf3jgap69	\N
clv486c5d001uqdfr2923cme4	English Miss..jpg	https://test-for-flower.storage.yandexcloud.net/English_Miss_4abafa5f94.jpg	2024-04-17 19:48:15.745	2024-04-18 14:15:34.221	clv486c4g0018qdfr1htc2x1l	\N
clv486c5d001vqdfr2bisn199	Miss America3.jpg	https://test-for-flower.storage.yandexcloud.net/Miss_America3_0a56c25edd.jpg	2024-04-17 19:48:15.745	2024-04-18 14:15:34.221	clv486c4g0019qdfrecemsn6t	\N
clv486c5d001wqdfr9mnz1ch9	Miss America2.jpg	https://test-for-flower.storage.yandexcloud.net/Miss_America2_4ccd32b4fd.jpg	2024-04-17 19:48:15.745	2024-04-18 14:15:34.221	clv486c4g0019qdfrecemsn6t	\N
clv486c5d001xqdfrg3gjatrb	Miss America.jpg	https://test-for-flower.storage.yandexcloud.net/Miss_America_365ca36834.jpg	2024-04-17 19:48:15.745	2024-04-18 14:15:34.221	clv486c4g0019qdfrecemsn6t	\N
clv486c5d001yqdfrwlo4ryo7	Coral Sunset.png	https://test-for-flower.storage.yandexcloud.net/Coral_Sunset_e8de5d1742.png	2024-04-17 19:48:15.745	2024-04-18 14:15:34.221	clv486c4g001aqdfr7zd8fmo6	\N
\.


--
-- Data for Name: Main_category; Type: TABLE DATA; Schema: public; Owner: fiori
--

COPY public."Main_category" (id, name, visible, "createdAt", "updatedAt") FROM stdin;
clv486c250002qdfrpcbqtobd	Цветы	t	2024-04-17 19:48:15.629	2024-04-17 19:48:15.629
clv486c250003qdfrh3h63x7f	Зелень	t	2024-04-17 19:48:15.629	2024-04-17 19:48:15.629
\.


--
-- Data for Name: Product; Type: TABLE DATA; Schema: public; Owner: fiori
--

COPY public."Product" (id, sku, name, description, price, growth, quantity, min_quantity, delivery, "createdAt", "updatedAt", "main_categoryId", "categoryId", "sub_categoryId", "vendorId", "colorId") FROM stdin;
clv486c4g000tqdfrp3809z84	KAt50	Athena	Цвет: кремовый, с розовыми краями. Аромат интенсивный, но свежий. Верхние ноты цитрусовых присутствует даже тогда, когда бутон только открывается. Когда цветок полностью открыт прекрасные ноты свежего личи и белого персика преобладают над ароматами груши и сливы, которые также присутствуют. Базовые ноты пачули и  свежего мирта слабы, но завершают композицию аромата.  Рост: прямо, вертикально Этот сорт является частью новой коллекции Eleganza, выбран из молодых, здоровых чайно-гибридных роз с привлекательными цветами и превосходным сопротивлением болезням. Эти цветоносные чайно-гибридные розы в собственном классе принесут беззаботный стиль каждому саду. Розы из питомника Kordes считаются одними из лучших в мире. И это высокое звание они заслужили не зря, поскольку для этих сортовых роз характерна не только бесподобная красота, но и длительное и пышное цветение, отличная устойчивость к холодам и различным заболеваниям. Розы Kordes имеют многочисленные награды, полученные на международных выставках. Еще одна безусловная заслуга питомника – знак ADR, который присвоен некоторым сортам питомника за их высокую декоративность и устойчивость к неблагоприятным условиям. Основателем питомника Kordes стал Вильгельм Кордес. Именно ему принадлежит идея создания на плодородных землях Эльмшорна питомника для различных растений. Постепенно в питомнике роль главной культуры была отдана розе, а дело по селекции и разведению роз было подхвачено сыновьями Кордеса – Германом и Вильгельмом. На протяжении всего периода существования питомника Kordes, при селекционных работах здесь в первую очередь уделялось внимание морозостойкости и устойчивости к болезням. И старания владельцев питомника были вознаграждены появлением великолепных сортов с чудесными ароматами, продолжительным цветением и совершенной формой бутонов в обрамлении декоративных листьев. А особая неприхотливость и морозостойкость прекрасно подходит для российского климата.	39	50	100	10	2024-04-16 00:00:00	2024-04-17 19:48:15.712	2024-04-18 14:23:09.295	clv486c250002qdfrpcbqtobd	clv486c2l0004qdfrgl8vqv9r	clv486c30000cqdfryezghln5	clv486c3f000fqdfruuthzcuy	clv486c3u000sqdfrausyf0xf
clv486c4g000wqdfry6ri4krb	Nso	Solidago	Название солидаго происходит от латинского слова «solidago», что означает «придавать сил, исцелять или делать цельным». Имя этого растения отражает его целебные свойства.	55	55	50	10	2024-04-24 00:00:00	2024-04-17 19:48:15.712	2024-04-18 14:19:02.742	clv486c250003qdfrh3h63x7f	clv486c2l0008qdfrtp5steie	\N	clv486c3f000fqdfruuthzcuy	clv486c3u000nqdfrowp7c2r2
clv486c4g0015qdfrxie99fay	RP75	Juliet	Пионовидная роза Juliet – жемчужина цветочной коллекции селекционера Девида Остина. Сорт характеризует идеально круглая форма бутона, обилие кружевных лепестков персикового цвета с внешней стороны и насыщенного абрикосового ближе к центру, а также легкий приятный аромат, в котором преобладают нотки зеленого чая. До появления пионовидной Juliet мир еще никогда не видел роз с таким сложным и многогранным оттенком. Благодаря ему этот сорт пользуется такой невероятной популярностью во всем мире, украшает свадебные букеты самых знаменитых невест и торжественные залы в роскошных особняках. Роза Juliet хорошо сочетается с цветами как нежных, так и насыщенных тонов, прекрасно смотрится в авторских букетах и просто ослепительна в монокомпозиции из 11 и более штук. Преподнести такую пионовидную розу в подарок, пожалуй, самый изысканный способ выразить свои чувства.	78	75	100	25	2024-04-10 00:00:00	2024-04-17 19:48:15.712	2024-04-18 14:23:09.295	clv486c250002qdfrpcbqtobd	clv486c2l0004qdfrgl8vqv9r	clv486c30000dqdfr3b75vwlm	clv486c3f000hqdfri4up5bts	clv486c3u000sqdfrausyf0xf
clv486c4g000zqdfrhxsihzv9	Nstb	Statice blue	Название этого цветка происходит от греческого слова «leimon», что можно перевести как «поляна» или «лужайка». Видимо, это имя досталось растению за место произрастания его отдельных видов, которых всего насчитывается до 300 штук. Еще одно название лимониума – кермек. Дикорастущий лимониум можно встретить по всему миру, но большинство видов любят засушливые регионы. Родиной же этого цветка считаются Канарские острова. Род лимониум относится к семейству Свинчатковых (Plumbaginaceae).	89	75	100	25	2024-04-24 00:00:00	2024-04-17 19:48:15.712	2024-04-18 14:17:39.472	clv486c250002qdfrpcbqtobd	clv486c2l0006qdfrmivwoc2l	\N	clv486c3f000gqdfrgvmhaep6	clv486c3u000lqdfrwwklvodd
clv486c4g0014qdfry35q7iqb	EXR75	Explore	Необычная махровая роза красного цвета. Бутон очень крупный и плотный, цветок отличается великолепной стойкостью.	99	75	400	10	2024-04-23 00:00:00	2024-04-17 19:48:15.712	2024-04-18 14:23:09.295	clv486c250002qdfrpcbqtobd	clv486c2l0004qdfrgl8vqv9r	clv486c30000eqdfrpwcuynyt	clv486c3f000hqdfri4up5bts	clv486c3u000kqdfrjrm39c1f
clv486c4g0013qdfrrczrnojb	FR50	Freedom	Эквадорские розы сорта Freedom (Фридом) - бесспорные лидеры цветочного мира. Они пользуются огромной популярностью благодаря крупным высоким бутонам-бокалам, крепким стеблям и нежному аромату. Цветовая палитра бутонов варьируется от насыщенного до светлого красного оттенка с равномерным окрасом по всему лепестку. Розы Freedom великолепно смотрятся по одной и в букете, их можно преподносить в составе авторской композиции или в дополнении с различными декоративными элементами. Цветы именно этого сорта долго простоят в вазе при условии, что были куплены свежими и вовремя получали воду. Подарить красную розу Freedom можно на день рождения или годовщину, 14 февраля или 8 марта: такому роскошному подарку обрадуется любая девушка.	78	50	45	10	2024-04-16 00:00:00	2024-04-17 19:48:15.712	2024-04-18 14:23:09.295	clv486c250002qdfrpcbqtobd	clv486c2l0004qdfrgl8vqv9r	clv486c30000eqdfrpwcuynyt	clv486c3f000hqdfri4up5bts	clv486c3u000pqdfrw4bivoq8
clv486c4g001aqdfr7zd8fmo6	CSP75	Coral Sunset	Корал Сансет – самый популярный пион из коралловой серии. И не без причины. Из всех коралловых пионов этот имеет самые толстые стебли, наибольший объем листьев и самые крупные бутоны. Пионы серии Корал часто используются именно из-за своего оранжевого оттенка, а Корал Сансет – самый оранжевый из всех. 	110	75	200	15	2024-05-10 00:00:00	2024-04-17 19:48:15.712	2024-04-18 14:17:39.472	clv486c250002qdfrpcbqtobd	clv486c2l000aqdfrb4t92llh	\N	clv486c3f000iqdfrndw4b4v8	clv486c3u000qqdfr42a8ytwq
clv486c4g000yqdfrr3ikcx5s	Nhe85	Heliantus vincent choice	Подсолнечник серии Vincent’s отличается  большой гибкостью в программировании культуры	109	85	100	25	2024-04-30 00:00:00	2024-04-17 19:48:15.712	2024-04-18 14:17:39.472	clv486c250002qdfrpcbqtobd	clv486c2l0007qdfr3wt0l0j7	\N	clv486c3f000gqdfrgvmhaep6	clv486c3u000mqdfrlj0gkbp5
clv486c4g0012qdfrwdk2skp9	MOG50	MONARCH	Оранжевая гербера Монарх имеет простую ромашковидную форму и классические для гербер размеры. Высота безлиственного мощного стебля, в некоторых случаях, может достигать 45 сантиметров, а диаметр цветка варьируется в диапазоне 10-12 сантиметров. Отличительной особенностью этого сорта герберы является редкий цвет спелого апельсина, который хорошо вписывается в различные цветочные композиции	69	50	100	10	2024-05-10 00:00:00	2024-04-17 19:48:15.712	2024-04-18 14:17:39.472	clv486c250002qdfrpcbqtobd	clv486c2l000bqdfryum401mi	\N	clv486c3f000gqdfrgvmhaep6	clv486c3u000mqdfrlj0gkbp5
clv486c4g000xqdfrx078krxx	KAG50	Калинка	Гербера является многолетним травянистым растением из семейства Сложноцветных или Астровых. Растет только там, где тепло и влажно. В дикой природе насчитывают около 80 видов этого растения. Корневая система развитая, крепкая, мочковатая. Стебель прямостоячий, укороченный, часто опушенный. Высота растения достигает 60-70 см, но сорта, выведенные для выращивания в комнатных условиях, бывают ниже, до 30 см.	78	50	100	10	2024-05-10 00:00:00	2024-04-17 19:48:15.712	2024-04-18 14:17:39.472	clv486c250002qdfrpcbqtobd	clv486c2l000bqdfryum401mi	\N	clv486c3f000fqdfruuthzcuy	clv486c3u000qqdfr42a8ytwq
clv486c4g0010qdfrx2unug8o	Nstp	Statice pink	Название этого цветка происходит от греческого слова «leimon», что можно перевести как «поляна» или «лужайка». Видимо, это имя досталось растению за место произрастания его отдельных видов, которых всего насчитывается до 300 штук. Еще одно название лимониума – кермек. Дикорастущий лимониум можно встретить по всему миру, но большинство видов любят засушливые регионы. Родиной же этого цветка считаются Канарские острова. Род лимониум относится к семейству Свинчатковых (Plumbaginaceae).	89	75	100	25	2024-04-24 00:00:00	2024-04-17 19:48:15.712	2024-04-18 14:17:39.472	clv486c250002qdfrpcbqtobd	clv486c2l0006qdfrmivwoc2l	\N	clv486c3f000gqdfrgvmhaep6	clv486c3u000qqdfr42a8ytwq
clv486c4g0016qdfr3k5grv5i	PR75	Patience	Роза в романтическом стиле. Цветы - плоские розетки идеальной формы с взъерошенными лепестками, напоминающими тонкое кружево. Сильный аромат старинных роз с элементами фруктов, сирени и мирры.	63	75	50	10	2024-04-30 00:00:00	2024-04-17 19:48:15.712	2024-04-18 14:17:39.472	clv486c250002qdfrpcbqtobd	clv486c2l0004qdfrgl8vqv9r	\N	clv486c3f000hqdfri4up5bts	clv486c3u000qqdfr42a8ytwq
clv486c4g0019qdfrecemsn6t	MAP75	Miss America	Сорт отличается изумительно легкими и воздушными полумахровыми цветами диаметром 25 см. В стадии бутона белые лепестки имеют нежно-розовый румянец, но при распускании, становятся белоснежными. Белизна оттеняется ярко-желтыми тычинками. Красота чашевидных цветков дополняется приятным ароматом. Растение достигает 80-90 см высоты, но крепкие стебли не требуют подвязывания. Период цветения — с мая по июнь.	119	75	100	10	2024-05-01 00:00:00	2024-04-17 19:48:15.712	2024-04-18 14:17:39.472	clv486c250002qdfrpcbqtobd	clv486c2l000aqdfrb4t92llh	\N	clv486c3f000iqdfrndw4b4v8	clv486c3u000sqdfrausyf0xf
clv486c4g0018qdfr1htc2x1l	EMR75	English Miss.	English Miss серебристо-розовые, более темные по краям, среднего размера, очень душистые цветки. Махровые, в одном цветке находится примерно 35 лепестков. Бутоны раскрываются в цветки с сильным сладким запахом, напоминающие цветки камелии. Куст густо одет блестящими кожистыми листьями с лиловым оттенком.	80	75	100	10	2024-05-07 00:00:00	2024-04-17 19:48:15.712	2024-04-18 14:23:09.295	clv486c250002qdfrpcbqtobd	clv486c2l0004qdfrgl8vqv9r	clv486c30000dqdfr3b75vwlm	clv486c3f000iqdfrndw4b4v8	clv486c3u000sqdfrausyf0xf
clv486c4g000uqdfrpj0wuhb3	Nan70	Antonov	Хризантемы – это яркие, выразительные и простые в уходе цветы. Букет из хризантем подойдет для любого мероприятия или подарка своим близким.	119	70	25	25	2024-04-23 00:00:00	2024-04-17 19:48:15.712	2024-04-18 14:17:39.472	clv486c250002qdfrpcbqtobd	clv486c2l0005qdfrf7usa5ko	\N	clv486c3f000fqdfruuthzcuy	clv486c3u000jqdfr410fy9as
clv486c4g001bqdfrsatzbrxg	YGP75	Yellow Gem	Относится к ИТО-гибридам (травянистый+древовидный), очень яркий и нарядный сорт японской селекции. Диаметр полумахрового цветка 15 см, цвет насыщенно-желтый, с красными мазками. Цветение раннее, длительное (до 4 недель), очень обильное. Куст невысокий, до 50 см, компактный с красивой резной листвой.	112	75	50	15	2024-04-29 00:00:00	2024-04-17 19:48:15.712	2024-04-18 14:17:39.472	clv486c250002qdfrpcbqtobd	clv486c2l000aqdfrb4t92llh	\N	clv486c3f000iqdfrndw4b4v8	clv486c3u000nqdfrowp7c2r2
clv486c4g000vqdfree1lx3x5	Kbi50	Biscue	Царица цветов, королева сада, символ любви — какими только эпитетами не награждали розу за период ее существования. Она получила заслуженное внимание еще во времена Древней Греции и не снижает позиций по сегодняшний день. Нежные лепестки, острые шипы, чарующий аромат и невероятная палитра оттенков делают розу одним из самых популярных растений для украшения садов всего мира! Наша страна не стала исключением.	45	50	40	15	2024-04-03 00:00:00	2024-04-17 19:48:15.712	2024-04-18 14:19:02.742	clv486c250002qdfrpcbqtobd	clv486c2l0004qdfrgl8vqv9r	\N	clv486c3f000fqdfruuthzcuy	clv486c3u000sqdfrausyf0xf
clv486c4g001cqdfr5dkjovsv	VEG50	Вера	Гербера относится к роду астровых и похожа на астру, небольшой подсолнух или большую радужную ромашку. Насчитывается несколько десятков сортов	67	50	100	10	2024-05-10 00:00:00	2024-04-17 19:48:15.712	2024-04-18 14:17:39.472	clv486c250002qdfrpcbqtobd	clv486c2l000bqdfryum401mi	\N	clv486c3f000iqdfrndw4b4v8	clv486c3u000qqdfr42a8ytwq
clv486c4g0011qdfr1t4pe3hw	RVT50	tu royal virgin	Тюльпан «Ройал Вирджин» - популярный среди любителей белоснежных цветов сорт луковичных многолетников. Растение одаривает поистине восхитительными, крупными бокалами с чистой белой окраской. Лепестки цветов тесно прижаты друг к другу, поэтому бутоны очень аккуратны.	55	50	120	20	2024-05-09 00:00:00	2024-04-17 19:48:15.712	2024-04-18 14:17:39.472	clv486c250002qdfrpcbqtobd	clv486c2l0009qdfrq34ynxqr	\N	clv486c3f000gqdfrgvmhaep6	clv486c3u000jqdfr410fy9as
clv486c4g0017qdfrf3jgap69	PAR50	Princess Anne	Красивый новый сорт, представляющий собой новое направление в селекции английских роз. Внешний вид заметно отличается от других сортов, обладая своим, особенным шармом, но при этом сохраняя классические густомахровые цветки английской розы. Только что распустившиеся цветки густо-розовые, почти малиновые, по мере роспуска выгорают до ярко-розовых. Изнанка лепестков - с интересным желтым подтоном. Лепестки довольно узкие, необычно плотные. Куст прямостоячий, листва довольно плотная, кожистая, очень блестящая.	105	50	200	50	2024-05-10 00:00:00	2024-04-17 19:48:15.712	2024-04-18 14:23:09.295	clv486c250002qdfrpcbqtobd	clv486c2l0004qdfrgl8vqv9r	clv486c30000eqdfrpwcuynyt	clv486c3f000hqdfri4up5bts	clv486c3u000sqdfrausyf0xf
\.


--
-- Data for Name: Session; Type: TABLE DATA; Schema: public; Owner: fiori
--

COPY public."Session" ("sessionToken", "userId", expires, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Sub_category; Type: TABLE DATA; Schema: public; Owner: fiori
--

COPY public."Sub_category" (id, name, visible, "createdAt", "updatedAt", "main_categoryId", "categoryId") FROM stdin;
clv486c30000cqdfryezghln5	Кустовая	t	2024-04-17 19:48:15.66	2024-04-18 14:11:02.411	clv486c250002qdfrpcbqtobd	clv486c2l0004qdfrgl8vqv9r
clv486c30000dqdfr3b75vwlm	Пионовидная	t	2024-04-17 19:48:15.66	2024-04-18 14:11:02.411	clv486c250002qdfrpcbqtobd	clv486c2l0004qdfrgl8vqv9r
clv486c30000eqdfrpwcuynyt	Одноголовая	t	2024-04-17 19:48:15.66	2024-04-18 14:11:02.411	clv486c250002qdfrpcbqtobd	clv486c2l0004qdfrgl8vqv9r
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: fiori
--

COPY public."User" (id, email, "emailVerified", "createdAt", "updatedAt", password, blocked, image, "lastName", phone, name, role) FROM stdin;
clv430q8z0000z1dw3olcbzfm	admin@admin.ru	\N	2024-04-17 17:23:56.002	2024-04-18 14:03:04.653	$2a$10$2qJuE.ufGFxA9anVBFHPouLPigFaIXvP5uJVq5l8ehJ4bcbZBRss.	f	\N	Admin	1234567890	Admin	ADMIN
clv430q9e0001z1dwp2u83wlm	bob@test.ru	\N	2024-04-17 17:23:56.018	2024-04-18 14:03:04.663	$2a$10$.Uq3qDSWgi7oClfFcLrvyO7PkZmmYH94YTDDHeNR/qvi1c8WPTtzG	f	\N	Smith	1234567890	Bob	USER
\.


--
-- Data for Name: Vendor; Type: TABLE DATA; Schema: public; Owner: fiori
--

COPY public."Vendor" (id, name, visible, "createdAt", "updatedAt") FROM stdin;
clv486c3f000fqdfruuthzcuy	Эквадор	t	2024-04-17 19:48:15.675	2024-04-17 19:48:15.675
clv486c3f000gqdfrgvmhaep6	Голландия	t	2024-04-17 19:48:15.675	2024-04-17 19:48:15.675
clv486c3f000hqdfri4up5bts	Кения	t	2024-04-17 19:48:15.675	2024-04-17 19:48:15.675
clv486c3f000iqdfrndw4b4v8	Нидерланды	t	2024-04-17 19:48:15.675	2024-04-17 19:48:15.675
\.


--
-- Data for Name: VerificationToken; Type: TABLE DATA; Schema: public; Owner: fiori
--

COPY public."VerificationToken" (identifier, token, expires) FROM stdin;
\.


--
-- Data for Name: _ColectionToProduct; Type: TABLE DATA; Schema: public; Owner: fiori
--

COPY public."_ColectionToProduct" ("A", "B") FROM stdin;
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: fiori
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
0cc241e5-0c32-4071-b1dd-ab756b79127a	5ee8797378e0c52a9254fccfa1641ec9a1617aec29ada7a3c2fd8e1eb415a180	2024-04-17 07:41:17.456116+00	20240414113825_init	\N	\N	2024-04-17 07:41:17.383457+00	1
f30d7eeb-e39d-4224-bd52-e203482ad8e5	ab80a534dfa4779eeae4ae5aeac192eea19b283671d6083c8f112e3c8a4229df	2024-04-17 07:41:17.468108+00	20240414140514_add_password_field	\N	\N	2024-04-17 07:41:17.459783+00	1
ff61f6e6-0e9f-4e77-a26a-d24bcdbf77d0	cbe107d46a024e5867372cc2549f5ed0c25127d35aab989e56f8c4b6af1eec98	2024-04-17 07:41:17.489745+00	20240414140831_aad_role_field	\N	\N	2024-04-17 07:41:17.471919+00	1
9e3166ce-08d1-4a65-aee1-b3e1d6c6e622	907e092c17c6c7a60ed1c05c247a81e6a93800c7fa06513f4d3be8ba13a27cca	2024-04-17 07:41:17.624476+00	20240414194710_add_product	\N	\N	2024-04-17 07:41:17.495781+00	1
4bd9ea59-1729-4366-9c9d-0d6c4daae07a	92b55e22bb7874765d61adfbcec2021538d39979c861eeff713d1e954594f237	2024-04-17 07:41:17.662508+00	20240414210600_fix_relatishion	\N	\N	2024-04-17 07:41:17.627332+00	1
5fc2b2b8-f436-4f06-bcc0-70540b1e20c7	acf337557cf8e0ddf6ba6ef65565350f3df87ca628b2ffe74061c75c8097a52f	2024-04-17 07:41:17.681497+00	20240415064058_add_fiel_hex	\N	\N	2024-04-17 07:41:17.665496+00	1
d8e714cc-073f-4889-b6cd-99d40f93cab0	27c8bfba8e4eee04493678899c459e4346d12a41f1efddbaf0999e483e3fddb9	2024-04-17 07:41:17.712668+00	20240415104837_fix_err	\N	\N	2024-04-17 07:41:17.68612+00	1
83cb02d3-b8f7-473c-af50-d541deeae1f4	4a82884ca91fe9c9e3771419c68a89c872d4b10436348d947011304f5e10bd71	2024-04-17 07:41:17.731167+00	20240416114839_add_image_user	\N	\N	2024-04-17 07:41:17.715983+00	1
fe0291f2-2009-42de-88b8-2345ec2cec9f	967f2c29f87b13676c4d43b4ff502547b135a7580b6030e0b272108ec8f75b7d	2024-04-17 07:41:17.754724+00	20240416133223_add_phone	\N	\N	2024-04-17 07:41:17.73664+00	1
41fc52d2-e85d-4221-9237-d9b03b879606	0c19e5047a9d37550156b8a3c5178cb13fc9bf91284b4bb95d07b738f2ab5905	2024-04-17 07:41:33.742474+00	20240417074133_fix_err	\N	\N	2024-04-17 07:41:33.731558+00	1
54881f10-4dba-432b-971a-961215d233b3	3d3b4bea3919982a3daa81886388ab5401be71f7c4dc376eebc718b59d9a5894	2024-04-17 12:04:23.947644+00	20240417120423_fix_role	\N	\N	2024-04-17 12:04:23.927531+00	1
\.


--
-- Name: Account Account_pkey; Type: CONSTRAINT; Schema: public; Owner: fiori
--

ALTER TABLE ONLY public."Account"
    ADD CONSTRAINT "Account_pkey" PRIMARY KEY (provider, "providerAccountId");


--
-- Name: Authenticator Authenticator_pkey; Type: CONSTRAINT; Schema: public; Owner: fiori
--

ALTER TABLE ONLY public."Authenticator"
    ADD CONSTRAINT "Authenticator_pkey" PRIMARY KEY (id);


--
-- Name: Category Category_pkey; Type: CONSTRAINT; Schema: public; Owner: fiori
--

ALTER TABLE ONLY public."Category"
    ADD CONSTRAINT "Category_pkey" PRIMARY KEY (id);


--
-- Name: Colection Colection_pkey; Type: CONSTRAINT; Schema: public; Owner: fiori
--

ALTER TABLE ONLY public."Colection"
    ADD CONSTRAINT "Colection_pkey" PRIMARY KEY (id);


--
-- Name: Color Color_pkey; Type: CONSTRAINT; Schema: public; Owner: fiori
--

ALTER TABLE ONLY public."Color"
    ADD CONSTRAINT "Color_pkey" PRIMARY KEY (id);


--
-- Name: Image Image_pkey; Type: CONSTRAINT; Schema: public; Owner: fiori
--

ALTER TABLE ONLY public."Image"
    ADD CONSTRAINT "Image_pkey" PRIMARY KEY (id);


--
-- Name: Main_category Main_category_pkey; Type: CONSTRAINT; Schema: public; Owner: fiori
--

ALTER TABLE ONLY public."Main_category"
    ADD CONSTRAINT "Main_category_pkey" PRIMARY KEY (id);


--
-- Name: Product Product_pkey; Type: CONSTRAINT; Schema: public; Owner: fiori
--

ALTER TABLE ONLY public."Product"
    ADD CONSTRAINT "Product_pkey" PRIMARY KEY (id);


--
-- Name: Sub_category Sub_category_pkey; Type: CONSTRAINT; Schema: public; Owner: fiori
--

ALTER TABLE ONLY public."Sub_category"
    ADD CONSTRAINT "Sub_category_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: fiori
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: Vendor Vendor_pkey; Type: CONSTRAINT; Schema: public; Owner: fiori
--

ALTER TABLE ONLY public."Vendor"
    ADD CONSTRAINT "Vendor_pkey" PRIMARY KEY (id);


--
-- Name: VerificationToken VerificationToken_pkey; Type: CONSTRAINT; Schema: public; Owner: fiori
--

ALTER TABLE ONLY public."VerificationToken"
    ADD CONSTRAINT "VerificationToken_pkey" PRIMARY KEY (identifier, token);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: fiori
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Authenticator_credentialID_key; Type: INDEX; Schema: public; Owner: fiori
--

CREATE UNIQUE INDEX "Authenticator_credentialID_key" ON public."Authenticator" USING btree ("credentialID");


--
-- Name: Category_name_key; Type: INDEX; Schema: public; Owner: fiori
--

CREATE UNIQUE INDEX "Category_name_key" ON public."Category" USING btree (name);


--
-- Name: Colection_name_key; Type: INDEX; Schema: public; Owner: fiori
--

CREATE UNIQUE INDEX "Colection_name_key" ON public."Colection" USING btree (name);


--
-- Name: Color_name_key; Type: INDEX; Schema: public; Owner: fiori
--

CREATE UNIQUE INDEX "Color_name_key" ON public."Color" USING btree (name);


--
-- Name: Image_userId_key; Type: INDEX; Schema: public; Owner: fiori
--

CREATE UNIQUE INDEX "Image_userId_key" ON public."Image" USING btree ("userId");


--
-- Name: Main_category_name_key; Type: INDEX; Schema: public; Owner: fiori
--

CREATE UNIQUE INDEX "Main_category_name_key" ON public."Main_category" USING btree (name);


--
-- Name: Product_sku_key; Type: INDEX; Schema: public; Owner: fiori
--

CREATE UNIQUE INDEX "Product_sku_key" ON public."Product" USING btree (sku);


--
-- Name: Session_sessionToken_key; Type: INDEX; Schema: public; Owner: fiori
--

CREATE UNIQUE INDEX "Session_sessionToken_key" ON public."Session" USING btree ("sessionToken");


--
-- Name: Sub_category_name_key; Type: INDEX; Schema: public; Owner: fiori
--

CREATE UNIQUE INDEX "Sub_category_name_key" ON public."Sub_category" USING btree (name);


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: fiori
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: Vendor_name_key; Type: INDEX; Schema: public; Owner: fiori
--

CREATE UNIQUE INDEX "Vendor_name_key" ON public."Vendor" USING btree (name);


--
-- Name: _ColectionToProduct_AB_unique; Type: INDEX; Schema: public; Owner: fiori
--

CREATE UNIQUE INDEX "_ColectionToProduct_AB_unique" ON public."_ColectionToProduct" USING btree ("A", "B");


--
-- Name: _ColectionToProduct_B_index; Type: INDEX; Schema: public; Owner: fiori
--

CREATE INDEX "_ColectionToProduct_B_index" ON public."_ColectionToProduct" USING btree ("B");


--
-- Name: Account Account_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: fiori
--

ALTER TABLE ONLY public."Account"
    ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Authenticator Authenticator_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: fiori
--

ALTER TABLE ONLY public."Authenticator"
    ADD CONSTRAINT "Authenticator_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Category Category_main_categoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: fiori
--

ALTER TABLE ONLY public."Category"
    ADD CONSTRAINT "Category_main_categoryId_fkey" FOREIGN KEY ("main_categoryId") REFERENCES public."Main_category"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Colection Colection_imageId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: fiori
--

ALTER TABLE ONLY public."Colection"
    ADD CONSTRAINT "Colection_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES public."Image"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Image Image_productId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: fiori
--

ALTER TABLE ONLY public."Image"
    ADD CONSTRAINT "Image_productId_fkey" FOREIGN KEY ("productId") REFERENCES public."Product"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Image Image_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: fiori
--

ALTER TABLE ONLY public."Image"
    ADD CONSTRAINT "Image_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Product Product_categoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: fiori
--

ALTER TABLE ONLY public."Product"
    ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES public."Category"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Product Product_colorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: fiori
--

ALTER TABLE ONLY public."Product"
    ADD CONSTRAINT "Product_colorId_fkey" FOREIGN KEY ("colorId") REFERENCES public."Color"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Product Product_main_categoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: fiori
--

ALTER TABLE ONLY public."Product"
    ADD CONSTRAINT "Product_main_categoryId_fkey" FOREIGN KEY ("main_categoryId") REFERENCES public."Main_category"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Product Product_sub_categoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: fiori
--

ALTER TABLE ONLY public."Product"
    ADD CONSTRAINT "Product_sub_categoryId_fkey" FOREIGN KEY ("sub_categoryId") REFERENCES public."Sub_category"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Product Product_vendorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: fiori
--

ALTER TABLE ONLY public."Product"
    ADD CONSTRAINT "Product_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES public."Vendor"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Session Session_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: fiori
--

ALTER TABLE ONLY public."Session"
    ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Sub_category Sub_category_categoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: fiori
--

ALTER TABLE ONLY public."Sub_category"
    ADD CONSTRAINT "Sub_category_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES public."Category"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Sub_category Sub_category_main_categoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: fiori
--

ALTER TABLE ONLY public."Sub_category"
    ADD CONSTRAINT "Sub_category_main_categoryId_fkey" FOREIGN KEY ("main_categoryId") REFERENCES public."Main_category"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: _ColectionToProduct _ColectionToProduct_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: fiori
--

ALTER TABLE ONLY public."_ColectionToProduct"
    ADD CONSTRAINT "_ColectionToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES public."Colection"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _ColectionToProduct _ColectionToProduct_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: fiori
--

ALTER TABLE ONLY public."_ColectionToProduct"
    ADD CONSTRAINT "_ColectionToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES public."Product"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

--
-- PostgreSQL database cluster dump complete
--

