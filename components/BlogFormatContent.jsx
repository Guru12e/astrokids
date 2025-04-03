import Image from "next/image";

const BlogFormatContent = ({ content }) => {
  return (
    <div className="max-w-3xl mx-auto">
      {content.map((block, index) => {
        switch (block.type) {
          case "title":
            return (
              <h1
                key={index}
                className="text-3xl md:text-4xl font-bold text-gray-800 mb-6"
              >
                {block.content}
              </h1>
            );
          case "subtitle":
            return (
              <h2
                key={index}
                className="text-2xl font-semibold text-gray-700 mt-8 mb-4"
              >
                {block.content}
              </h2>
            );
          case "para":
            return (
              <p key={index} className="text-gray-600 leading-relaxed mb-4">
                {block.content}
              </p>
            );
          case "image":
            return (
              <div key={index} className="my-6">
                <div className="w-full aspect-video relative">
                  <Image
                    src={`https://drive.usercontent.google.com/download?id=${block.image}`}
                    alt={block.content}
                    fill
                    className="rounded-lg shadow-md"
                  />
                </div>
                <p className="text-sm text-gray-500 mt-2 italic">
                  {block.content}
                </p>
              </div>
            );
          case "points":
            return (
              <ul key={index} className="list-disc pl-6 mb-6 space-y-4">
                {block.points.map((point, i) => (
                  <li key={i} className="text-gray-600">
                    <span className="font-semibold text-gray-800">
                      {point.title}:
                    </span>{" "}
                    {point.content}
                  </li>
                ))}
              </ul>
            );
          case "points-points":
            return (
              <div key={index} className="my-8">
                {block.content.map((item, index) => (
                  <div key={index} className="mb-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {item.title}
                    </h3>

                    <p className="text-gray-600 leading-relaxed mb-3">
                      {item.content}
                    </p>

                    <h4 className="text-lg font-medium text-gray-700 mt-4 mb-2">
                      {item.subtitle}
                    </h4>

                    <ul className="list-disc pl-6 space-y-2 text-gray-600">
                      {item.points.map((point, i) => (
                        <li key={i}>{point}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            );
          case "points-points-with-image":
            return (
              <div key={index} className="my-8">
                {block.content.map((item, index) => (
                  <div key={index} className="mb-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {item.title}
                    </h3>

                    {item.image != "none" && (
                      <div className="w-[60%] aspect-video relative mb-2">
                        <Image
                          src={`https://drive.usercontent.google.com/download?id=${point.image}`}
                          alt={point.title}
                          fill
                          className="rounded-lg shadow-md mb-2"
                        />
                      </div>
                    )}

                    <p className="text-gray-600 leading-relaxed mb-3">
                      {item.content}
                    </p>

                    <h4 className="text-lg font-medium text-gray-700 mt-4 mb-2">
                      {item.subtitle}
                    </h4>

                    <ul className="list-disc pl-6 space-y-2 text-gray-600">
                      {item.points.map((point, i) => (
                        <li key={i}>
                          <p className="text-gray-600 leading-relaxed mt-3">
                            {point}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
};

export default BlogFormatContent;
