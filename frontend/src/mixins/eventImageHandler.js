import axios from 'axios' 
import {
    isMobile
} from 'mobile-device-detect'
export const eventImageHandler = {
    data() {
        return {
            baseURL: axios.defaults.baseURL,
            imgPreURL: 'https://cdn.alifeofriley.com/uploads/event/'
        }
    },
    computed: {
        small_tile_image() {
            if (this.event.small_tile_image === null) {
                return ''
            } else if (this.event.small_tile_image.indexOf('http') !== -1) {
                let imageId = this.event.small_tile_image.replace(this.imgPreURL, '')
                imageId = imageId.replace('.webp.webp', '.webp')
                imageId = imageId.replace('.webp', '')
                if (this.event.small_tile_image.indexOf('.webp') === -1) {
                    return this.imgPreURL + this.event.small_tile_image
                } else if ((this.isSafari && isMobile) || isMobile) {
                    return this.imgPreURL + imageId + '.jpg'
                } else if (this.isSafari) {
                    return this.imgPreURL + imageId + '.jpg'
                } else {
                    return this.event.small_tile_image.replace('.webp.webp', '.webp')
                }
            } else {
                if (this.event.small_tile_image.indexOf('.webp') === -1) {
                    return this.imgPreURL + this.event.small_tile_image
                } else if ((this.isSafari && isMobile) || isMobile) {
                    return (
                        this.imgPreURL +
                        this.event.small_tile_image.replace('.webp', '.jpg')
                    )
                } else if (this.isSafari) {
                    return (
                        this.imgPreURL +
                        this.event.small_tile_image.replace('.webp', '.jpg')
                    )
                } else {
                    return (
                        this.imgPreURL +
                        this.event.small_tile_image.replace('.webp.webp', '.webp')
                    )
                }
            }
        },
        bannerImg() {
            if (
                this.event.featured_image !== undefined &&
                this.event.featured_image !== null
            ) {
                if (this.event.featured_image.indexOf('.webp') === -1) {
                    return this.imgPreURL + this.event.featured_image
                } else if ((this.isSafari && isMobile) || isMobile) {
                    return (
                        this.imgPreURL +
                        this.event.featured_image.replace('.webp', '.jpg')
                    )
                } else if (this.isSafari) {
                    return (
                        this.imgPreURL +
                        this.event.featured_image.replace('.webp', '.jpg')
                    )
                }
                return this.imgPreURL + this.event.featured_image
            } else {
                return '/images/banners/about-banner.jpg'
            }
        },
        isSafari() {
            let userAgentString = navigator.userAgent
            return (
                userAgentString.indexOf('Safari') !== -1 &&
                userAgentString.indexOf('Chrome') === -1
            )
        }
    }
}