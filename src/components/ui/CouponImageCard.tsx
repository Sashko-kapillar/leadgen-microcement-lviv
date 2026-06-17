import coupon from '../../assets/images/moreInfo/popup-coupon.webp'

type CouponImageCardProps = {
  couponNumber: string
}

const CouponImageCard = ({ couponNumber }: CouponImageCardProps) => {
  return (
    <div className="font-primary flex w-[1200px] items-center justify-center bg-white p-12">
      <div className="relative flex aspect-3/2 w-full max-w-[1000px] justify-center">
        <img
          src={coupon}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 size-full object-contain select-none"
        />

        <div className="relative z-10 flex size-full flex-col items-center justify-center px-16 text-center">
          <p className="text-accent text-[52px] font-bold tracking-wide uppercase">
            Купон на матеріал
          </p>

          <div className="bg-accent/35 my-4 h-px w-[62%]" />

          <p className="text-accent text-[170px] leading-none font-black tracking-tight">-10%</p>

          <div className="bg-accent/35 my-5 h-px w-[62%]" />

          <p className="text-text-main text-[54px] font-bold">№ {couponNumber}</p>
        </div>
      </div>
    </div>
  )
}

export default CouponImageCard
