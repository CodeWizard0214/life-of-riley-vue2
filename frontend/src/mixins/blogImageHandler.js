import axios from 'axios';
import { isMobile } from 'mobile-device-detect';
export const blogImageHandler = {
    data() {
        return {
            baseURL: axios.defaults.baseURL,
            imgPreURL: 'https://cdn.alifeofriley.com/uploads/blogs/',
        }
    },
    methods: {
        getRelatedImage(imageId) {
            if (imageId !== undefined) {
                if (imageId.indexOf('.webp') === -1) {
                    return (
                        this.imgPreURL +
                        imageId
                    )
                } else if (this.isSafari || isMobile) {
                    return (
                        this.imgPreURL +
                        imageId.replace('.webp', '.jpg')
                    )
                } else {
                    return (
                        this.imgPreURL +
                        imageId
                    )
                }
            } else {
                return '';
            }
        }
    },
    computed: {
        isSafari() {
            let userAgentString = navigator.userAgent;
            return (userAgentString.indexOf('Safari') !== -1 && userAgentString.indexOf('Chrome') === -1);
        },
        featured_image() {
            if (this.blog.featured_image !== undefined && this.blog.featured_image !== null) {
                if (this.blog.featured_image.indexOf('.webp') === -1) {
                    return (
                        this.imgPreURL +
                        this.blog.featured_image
                    )
                } else if ((this.isSafari && isMobile) || isMobile) {
                    return (
                        this.imgPreURL +
                        this.blog.featured_image.replace('.webp', '.jpg')
                    )
                } else if (this.isSafari) {
                    return (
                        this.imgPreURL +
                        this.blog.featured_image.replace('.webp', '.jpg')
                    )
                } else {
                    return (
                        this.imgPreURL +
                        this.blog.featured_image
                    )
                }
            } else {
                return '';
            }
        },
        bannerImg() {
            if (this.blog.featured_image !== undefined && this.blog.featured_image !== null) {
                if (this.blog.featured_image.indexOf('.webp') === -1) {
                    return (
                        this.imgPreURL +
                        this.blog.featured_image
                    )
                } else if ((this.isSafari && isMobile) || isMobile) {
                    return this.imgPreURL +
                        this.blog.featured_image.replace('.webp', '.jpg');
                } else if (this.isSafari) {
                    return this.imgPreURL +
                        this.blog.featured_image.replace('.webp', '.jpg');
                }
                return (
                    this.imgPreURL +
                    this.blog.featured_image
                )
            } else {
                return '';
            }
        },
    }
}