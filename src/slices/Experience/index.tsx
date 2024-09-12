import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import { formatDateMonth } from "@/utils/FormatDate";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Experience`.
 */
export type ExperienceProps = SliceComponentProps<Content.ExperienceSlice>;

/**
 * Component for "Experience" Slices.
 */
const Experience = ({ slice }: ExperienceProps): JSX.Element => {

  const { work } = slice.primary;
  
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    > 
     <Heading size="xl" className="col-start-1">
         Experiencia
      </Heading>

      <div className="relative mt-20">
        {/* Timeline */}
        <ol className="relative border-l-2 border-gray-200 dark:border-gray-700">
          {work.map((job, index) => (
            <li key={index} className="mb-10 ml-6">
              {/* Timeline Dot */}
              <div className="absolute w-4 h-4 bg-gray-200 rounded-full -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
              {/* Content */}
               <div className="flex items-center space-x-4">
                {job.company_image?.url && (
                  <PrismicNextImage
                    field={job.company_image}
                    className="w-16 h-16 object-cover rounded-full"
                    alt={""}
                  />
                )}
                <div>
                  <h3 className="text-2xl font-bold dark:text-white">
                    {job.company_name}
                  </h3>
                  <p className="text-lg text-gray-400 dark:text-gray-200">
                    {job.position}
                  </p>
                  <p className="text-lg text-gray-400 dark:text-gray-400">
                    {job.start_date && ` ${formatDateMonth(job.start_date)}`}
                    {job.end_date ? ` / ${formatDateMonth(job.end_date)}` : " / Actualidad"}
                  </p>

                </div>
              </div>
              <div className="prose prose-lg prose-invert mt-5">
                {job.description && <PrismicRichText field={job.description} />}
              </div>
              {/* Optionally add a link or button here */}
            </li>
          ))}
        </ol>
      </div>
    </Bounded>
  );
};

export default Experience;
