export default {
    data() {
        return {
            seoInfo: {
                title: '',
                desc: '',
                keywords: '',
                img: '',
                url: ''
            }
        }
    },
    metaInfo() {
        return {
            title: this.seoInfo.title,
            titleTemplate: (this.seoInfo.title ? '%s -' : '') + ' Experiential Star',
            meta: [{
                    name: 'description',
                    content: this.seoInfo.desc
                },
                {
                    name: 'keywords',
                    content: this.seoInfo.keywords
                },
                // OpenGraph data (Most widely used)
                {
                    property: 'og:title',
                    content: (this.seoInfo.title ? this.seoInfo.title + ' - ' : '') +
                        ' Experiential Star'
                },
                {
                    property: 'og:site_name',
                    content: 'Experiential Star'
                },
                // The list of types is available here: http://ogp.me/#types
                {
                    property: 'og:type',
                    content: 'website'
                },
                // Should the the same as your canonical link, see below.
                {
                    property: 'og:url',
                    content: this.seoInfo.url
                },
                {
                    property: 'og:image',
                    content: this.seoInfo.img
                },
                // Often the same as your meta description, but not always.
                {
                    property: 'og:description',
                    content: this.seoInfo.desc
                },

                // Twitter card
                {
                    name: 'twitter:card',
                    content: 'summary'
                },
                {
                    name: 'twitter:site',
                    content: this.seoInfo.url
                },
                {
                    name: 'twitter:title',
                    content: (this.seoInfo.title ? this.seoInfo.title + ' - ' : '') +
                        ' Experiential Star'
                },
                {
                    name: 'twitter:description',
                    content: this.seoInfo.desc
                },
                // Your twitter handle, if you have one.
                // { name: 'twitter:creator', content: '@alligatorio' },
                // { name: 'twitter:image:src', content: this.seoInfo.img },

                // Google / Schema.org markup:
                {
                    itemprop: 'name',
                    content: (this.seoInfo.title ? this.seoInfo.title + ' - ' : '') +
                        ' Experiential Star'
                },
                {
                    itemprop: 'description',
                    content: this.seoInfo.desc
                },
                {
                    itemprop: 'image',
                    content: this.seoInfo.img
                }
            ],
            link: [{
                rel: 'canonical',
                href: this.seoInfo.url
            }]
        }
    },
    methods: {
        setMetaInfo(data) {
            this.seoInfo.title = data.title !== undefined ? data.title : ''
            this.seoInfo.desc = data.desc !== undefined ? data.desc : ''
            this.seoInfo.keywords = data.keywords !== undefined ? data.keywords : ''
            this.seoInfo.img = data.img !== undefined ? data.img : ''
            this.seoInfo.url = data.url !== undefined ? data.url : ''
        }
    }
}