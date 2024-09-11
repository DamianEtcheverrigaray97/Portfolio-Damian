import Bounded from "@/components/Bounded";
import Button from "@/components/Button";
import Heading from "@/components/Heading";
import { Content, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Studies`.
 */
export type StudiesProps = SliceComponentProps<Content.StudiesSlice>;

/**
 * Component for "Studies" Slices.
 */
const Studies = ({ slice }: StudiesProps): JSX.Element => {
  const { studies } = slice.primary;
  
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    > 
     <Heading size="xl" className="col-start-1">
         Estudios
      </Heading>

      <div className="relative mt-20">
        {/* Timeline */}
        <ol className="relative border-l-2 border-gray-200 dark:border-gray-700">
          {studies.map((job, index) => (
            <li key={index} className="mb-10 ml-6">
              {/* Timeline Dot */}
              <div className="absolute w-4 h-4 bg-gray-200 rounded-full -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
              {/* Content */}
               <div className="flex items-center space-x-4">
                {job.university_image?.url && (
                  <PrismicNextImage
                    field={job.university_image}
                    className="w-16 h-16 object-cover rounded-full"
                    alt={""}
                  />
                )}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {job.university_name}
                  </h3>
                  <p className="text-lg text-gray-400 dark:text-gray-200">
                    {job.name_university_degree}
                  </p>
                  <p className="text-lg text-gray-400 dark:text-gray-400">
                  {job.start_date && ` ${new Date(job.start_date).getFullYear()}`}
                    {job.end_date
                      ? ` / ${new Date(job.end_date).getFullYear()}`
                      : " - Actualidad"}
                  </p>
                </div>
              </div>
              <div className="prose prose-lg prose-invert mt-5">
                {job?.description && Array.isArray(job.description) ? (
                  <PrismicRichText field={job.description} />
                ) : (
                  <p>No description available</p>
                )}
              </div>
              {/* Optionally add a link or button here */}
              {isFilled.link(job.ratings) && (
                // <PrismicNextLink
                //   field={job.ratings}
                //   className="inline-flex items-center px-4 py-2 ml-9 mt-4 text-lg font-medium text-white bg-blue-600 rounded-md transition-all duration-200 hover:bg-blue-700 hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                //   aria-label="Descargar calificaciones"
                //   target="_blank" // Abre el enlace en una nueva ventana
                //   rel="noopener noreferrer" // Mejora la seguridad al abrir en nueva pestaña
                // >
                //   <span className="mr-2">Calificaciones</span>
                //   <FaArrowUpRightFromSquare className="text-xl" />
                // </PrismicNextLink>
                <Button 
                  linkField={job.ratings}
                  label={"Calificaciones"}
                  className="ml-9"
                />
              )}
            </li>
          ))}
        </ol>
      </div>
    </Bounded>
  );
};

export default Studies;
