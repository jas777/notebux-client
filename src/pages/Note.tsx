import React, {useContext, useEffect, useRef, useState} from "react";
import axios from "axios";
import {useNavigate, useSearchParams} from "react-router-dom";
import ReactMarkdown from "react-markdown";

import Note from "../types/Note";
import {API_URL} from "../App";
import useToken from "../hooks/useToken";

import '../assets/scss/markdown.scss';
import '../assets/scss/highlight.scss';

import remarkGfm from "remark-gfm";
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import rehypeSanitize, {defaultSchema} from "rehype-sanitize";
import rehypeRaw from "rehype-raw";
import rehypePrismPlus from "rehype-prism-plus"
import {Prism} from "react-syntax-highlighter";
import DashboardButton from "../components/button/DashboardButton";
import {useAuth} from "../providers/auth";
import useAuthProtection from "../hooks/useAuthProtection";

const NotePage = () => {

    useAuthProtection();

    const [data, setData] = useState<Note>()
    const [raw, setRaw] = useState(false)

    const navigate = useNavigate()
    const [token] = useToken()
    const auth = useAuth()
    const [searchParams] = useSearchParams()

    const rawRef = useRef<HTMLTextAreaElement>(null)

    if (!searchParams.get('id')) navigate("/")

    useEffect(() => {

        axios.get<Note>(`${API_URL}/notes/${searchParams.get('id')}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(r => {
            if (r.data.title) {
                setData(r.data)
            } else navigate("/")
        })

        // When URL changes.
        window.addEventListener('hashchange', hashchange)

        // When on the URL already, perhaps after scrolling, and clicking again, which
        // doesn’t emit `hashchange`.
        document.addEventListener(
            'click',
            (event) => {
                if (
                    event.target &&
                    event.target instanceof HTMLAnchorElement &&
                    // eslint-disable-next-line no-restricted-globals
                    event.target.href === location.href &&
                    // eslint-disable-next-line no-restricted-globals
                    location.hash.length > 1
                ) {
                    setTimeout(() => {
                        if (!event.defaultPrevented) {
                            hashchange()
                        }
                    })
                }
            },
            false
        )

        function hashchange() {
            /** @type {string|undefined} */
            let hash

            try {
                // eslint-disable-next-line no-restricted-globals
                hash = decodeURIComponent(location.hash.slice(1)).toLowerCase()
            } catch {
                return
            }

            const name = 'user-content-' + hash
            const target =
                document.getElementById(name) || document.getElementsByName(name)[0]

            if (target) {
                setTimeout(() => {
                    target.scrollIntoView()
                }, 0)
            }
        }

    }, [navigate, searchParams, token, auth?.user])

    useEffect(() => {
        const raw = rawRef.current
        if (!raw) return;
        raw.style.height = `${raw.scrollHeight}px`
    }, [data, raw])

    return (
        <div className="w-full flex items-center flex-col w-3/4 self-center">
            <div className="bg-card-background shadow-xl rounded-3xl m-16 p-8 w-full">
                <h1 className="text-4xl font-medium font-heading text-primary font-semibold ">
                    {data?.title ? data.title : 'Fetching data...'}
                </h1>
                <div className="w-full p-4 bg-background m-auto my-4 flex">
                    <div className="mr-4">
                        <DashboardButton primary label="Rendered" onClick={() => setRaw(false)}/>
                    </div>
                    <div className="mr-4">
                        <DashboardButton secondary label="Raw" onClick={() => setRaw(true)}/>
                    </div>
                    <div className="mr-4">
                        <DashboardButton label="Go back to the list" onClick={() => navigate(`/`)}/>
                    </div>
                    {!!data?.shareTo && !data?.shareTo.includes(auth?.user?.email as string) &&
                        < DashboardButton label="Edit" onClick={() => navigate(`/edit?id=${data?.id}`)}/>}
                </div>
                <div className="mt-8 w-auto">
                    {raw && (
                        <textarea ref={rawRef} name="raw" id="raw" disabled
                                  value={data?.content ?? 'Fetching data...'}
                                  className="h-auto overflow-hidden resize-none bg-field-background transition-colors
                                  duration-150 appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-1
                                  leading-tight focus:outline-none focus:shadow-outline focus:border-primary"
                        />
                    )}
                    {!raw && <ReactMarkdown
                        children={data?.content ?? 'Fetching data...'}
                        remarkPlugins={[remarkGfm, remarkMath]}
                        rehypePlugins={[
                            rehypeAutolinkHeadings,
                            rehypeSlug,
                            [rehypeSanitize, {
                                ...defaultSchema,
                                attributes: {
                                    ...defaultSchema.attributes,
                                    div: [
                                        ...(defaultSchema.attributes!!.div || []),
                                        ['className', 'math', 'math-display']
                                    ],
                                    span: [
                                        ...(defaultSchema.attributes!!.span || []),
                                        ['className', 'math', 'math-inline']
                                    ],
                                    code: [
                                        ...(defaultSchema.attributes!!.code || []),
                                        // List of all allowed languages:
                                        ['className'].concat(Prism.supportedLanguages.map(l => `language-${l}`))
                                    ],
                                    h1: [
                                        ...(defaultSchema.attributes!!.h1 || []),
                                        ['id']
                                    ],
                                    h2: [
                                        ...(defaultSchema.attributes!!.h2 || []),
                                        ['id']
                                    ],
                                    h3: [
                                        ...(defaultSchema.attributes!!.h3 || []),
                                        ['id']
                                    ],
                                    h4: [
                                        ...(defaultSchema.attributes!!.h4 || []),
                                        ['id']
                                    ],
                                    h5: [
                                        ...(defaultSchema.attributes!!.h5 || []),
                                        ['id']
                                    ],

                                }
                            }],
                            rehypeRaw,
                            rehypePrismPlus,
                            rehypeKatex
                        ]}
                        className="markdown-body"
                    />}
                </div>
            </div>
        </div>
    )
}

export default NotePage;
