import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";

const settings = {
    meta: {
        rootUrl: "http://localhost:3000",
        title: "Ambulanta Varela",
        description: "Privatna dermatovenerološka i kirurška ambulanta Varela u Pločama Poduzetnički inkubator Ploče (prizemlje)",
        social: {
            graphic: "/images/logo/logo_transparent.png",
            instagram: "/ambulanta_varela",
            facebook: "/ambulanta.varela"
        },
    },
    routes: {
        authenticated: {
            pathAfterFailure: "/login",
        },
        public: {
            pathAfterFailure: "/login",
        },
    },
};

interface SocialTagsProps {
    url: string,
    title: string,
    description: string,
    image?: string,
    openGraphType?: string,
    createdAt?: string,
    updatedAt?: string
}

const socialTags = ({
    url,
    title,
    description,
    image,
    openGraphType,
    createdAt,
    updatedAt,
}: SocialTagsProps) => {
    const metaTags = [
    { name: "og:title", content: title },
    { name: "og:type", content: openGraphType },
    { name: "og:url", content: url },
    { name: "og:image", content: image || settings.meta.social.graphic },
    { name: "og:description", content: description },
    {
        name: "og:site_name",
        content: settings && settings.meta && settings.meta.title,
    },
    {
        name: "og:published_time",
        content: createdAt || new Date().toISOString(),
    },
    {
        name: "og:modified_time",
        content: updatedAt || new Date().toISOString(),
    },
    ];
    return metaTags;
};

const SEO = (props: { url: string; title: string; description: string; image?: string; schemaType?: string; openGraphType?: string; createdAt?: string; updatedAt?: string; }) => {
    const { url, title, description, image, schemaType } = props;

    return (
        <Head>
            <title>{title} | App</title>
            <meta name="description" content={description} />
            <meta itemProp="name" content={title} />
            <meta itemProp="description" content={description} />
            <meta itemProp="image" content={image || settings.meta.social.graphic} />
            {socialTags(props).map(({ name, content }) => {
                return <meta key={name} name={name} content={content} />;
            })}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                    "@context": "http://schema.org",
                    "@type": schemaType,
                    name: title,
                    about: description,
                    url: url,
                }),
                }}
            />
        </Head>
    );
};

SEO.defaultProps = {
    title: settings && settings.meta && settings.meta.title,
    description: settings && settings.meta && settings.meta.description,
    image:
        settings &&
        settings.meta &&
        settings.meta.social &&
        settings.meta.social.graphic,
    url: "/",
    openGraphType: "website",
    schemaType: "page",
};

SEO.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    url: PropTypes.string,
    openGraphType: PropTypes.string,
    schemaType: PropTypes.string,
};

export default SEO;