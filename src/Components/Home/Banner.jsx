import Carousel from './Utilities/Carousel'

const slides = [
    
    'https://img.freepik.com/free-vector/facebook-template-with-humanitary-aid-refugees-conceptwatercolor_83728-9598.jpg?w=1380&t=st=1699116288~exp=1699116888~hmac=fcaed64e996a07ee8d6ae1bd34b8facdba8c42c6ae1c24376ff39e65ac130b40',
    'https://img.freepik.com/free-psd/social-activity-horizontal-banner-template_23-2148972626.jpg?w=1060&t=st=1699117456~exp=1699118056~hmac=c27c156bec227c0cb7af38d5748d953ac6b94aa457d9f6af24137193981d43b2',
   'https://img.freepik.com/free-vector/people-donate-food-filling-cardboard-donation-box-with-different-products-help-poor-persons-shelter-tiny-volunteers-charity-hunger-reduce-support-social-care-line-art-vector-illustration_107791-10470.jpg?w=1060&t=st=1699117394~exp=1699117994~hmac=0556d6889d141ef644180c149e193903b4b2f2da665a62dc6d08a7e70903a9f7',
]

const Banner = () => {
    return (
        <div className='max-w-4xl mx-auto mb-12 '>
            <Carousel autoSlide={true} autoSlideInterval={2000}>
                {
                    slides.map(slide =>
                        <img src={slide} alt="" className='w-[1500px] lg:h-[500px] rounded-2xl'/>
                    )
                }
            </Carousel>
        </div>
    );
};

export default Banner;